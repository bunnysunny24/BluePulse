import os
import csv
import pandas as pd
import mysql.connector
from datetime import datetime, timedelta
from collections import defaultdict
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows your frontend to communicate with the backend
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# MySQL connection setup
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": os.environ.get("MYSQL_PASSWORD", "Bunny"),
    "database": "pipeline_db",
    "pool_name": "mypool",
    "pool_size": 5
}

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

# In-memory storage for now
pipeline_data = {}

def process_csv(file_path: str, pipeline_id: int):
    df = pd.read_csv(file_path)
    df.rename(columns={"Flow_Inlet (L/min)": "input_value", "Flow_Outlet (L/min)": "output_value"}, inplace=True)
    df["timestamp"] = pd.to_datetime(df["Timestamp"]).dt.strftime("%Y-%m-%d %H:%M:%S")

    # Compute moving averages
    df["average_day"] = df["input_value"].rolling(6, min_periods=1).mean()
    df["average_week"] = df["input_value"].rolling(12, min_periods=1).mean()
    df["average_time"] = df["input_value"].expanding().mean()

    pipeline_data[pipeline_id] = df.to_dict(orient="records")
    df.to_csv(f"data/pipeline_{pipeline_id}.csv", index=False)

def run_model(pipeline_id: int):
    file_path = f"data/pipeline_{pipeline_id}.csv"
    if not os.path.exists(file_path):
        return {"status": "error", "message": f"File for pipeline {pipeline_id} not found"}
    
    df = pd.read_csv(file_path)
    df.rename(columns={"Flow_Inlet (L/min)": "input_value", "Flow_Outlet (L/min)": "output_value"}, inplace=True)
    df["timestamp"] = pd.to_datetime(df["Timestamp"]).dt.strftime("%Y-%m-%d %H:%M:%S")
    df["difference"] = df["input_value"] - df["output_value"]
    df["7_day_average"] = df["input_value"].rolling(7, min_periods=1).mean()

    time_data = defaultdict(list)
    for _, row in df.iterrows():
        time = row['timestamp'].split()[1]  # Extract only the time part
        time_data[time].append({
            "timestamp": row['timestamp'],
            "input_value": row['input_value'],
            "output_value": row['output_value'],
            "average": row['7_day_average']
        })
    
    processed_data = []
    total_7_times = 0
    count = 0
    
    for time, values in time_data.items():
        if len(values) >= 7:
            avg_average = sum(v['average'] for v in values[-7:]) / 7
            processed_data.append({
                "time": values[-1]["timestamp"],
                "input_values": [v['input_value'] for v in values[-7:]],
                "output_values": [v['output_value'] for v in values[-7:]],
                "averages": [v['average'] for v in values[-7:]]
            })
            total_7_times += avg_average
            count += 1
    
    if count > 0:
        total_7_times /= count
    
    total_day = df['7_day_average'].mean()
    total_week = total_day * 7
    
    try:
        db = get_db_connection()
        cursor = db.cursor()
        for row in processed_data:
            query = """
                INSERT INTO pipeline_data (pipeline_id, timestamp, input_value, output_value, average_day, average_week, average_time)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                pipeline_id, row['time'], row['input_values'][-1], row['output_values'][-1], 
                row['averages'][-1], total_week, total_7_times
            ))
        db.commit()
        cursor.close()
        db.close()
    except mysql.connector.Error as err:
        return {"status": "error", "message": f"Database error: {err}"}
    
    return {
        "status": "success",
        "pipeline_id": pipeline_id,
        "processed_data": processed_data,
        "total_7_times": total_7_times,
        "total_day": total_day,
        "total_week": total_week
    }

@app.get("/pipeline-data/{pipeline_id}")
def get_pipeline_data(pipeline_id: int):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        query = """
        SELECT timestamp, input_value, output_value 
        FROM pipeline_data WHERE pipeline_id = %s ORDER BY timestamp DESC LIMIT 100
        """
        cursor.execute(query, (pipeline_id,))
        data = cursor.fetchall()
        cursor.close()
        db.close()

        # Filter data for the last 7 days
        today = datetime.now()
        last_seven_days = today - timedelta(days=7)
        recent_data = []

        for row in data:
            timestamp = datetime.strptime(row[0], "%Y-%m-%d %H:%M:%S")
            if timestamp >= last_seven_days:
                recent_data.append(row)

        # Compute statistics
        daily_stats = defaultdict(lambda: {"input": 0, "output": 0, "count": 0, "difference_sum": 0})

        for row in recent_data:
            timestamp, input_value, output_value = row
            day = timestamp.date()

            difference = input_value - output_value
            daily_stats[day]["input"] += input_value
            daily_stats[day]["output"] += output_value
            daily_stats[day]["difference_sum"] += difference
            daily_stats[day]["count"] += 1

        # Calculate average difference for each day
        stats = []
        for day, stats_data in daily_stats.items():
            avg_diff = stats_data["difference_sum"] / stats_data["count"]
            stats.append({
                "day": day,
                "input_avg": stats_data["input"] / stats_data["count"],
                "output_avg": stats_data["output"] / stats_data["count"],
                "difference_avg": avg_diff
            })

        return {"data": stats}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database query error: {err}")

@app.post("/upload-csv/{pipeline_id}")
async def upload_csv(pipeline_id: int, file: UploadFile = File(...)):
    file_path = f"data/pipeline_{pipeline_id}.csv"
    os.makedirs("data", exist_ok=True)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    process_csv(file_path, pipeline_id)
    return {"message": "CSV uploaded and processed successfully"}

@app.get("/run-model/{pipeline_id}")
def get_pipeline_analysis(pipeline_id: int):
    return run_model(pipeline_id)

@app.post("/start-model/{pipeline_id}")
async def start_model(pipeline_id: int):
    return {"message": f"Model {pipeline_id} started"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
