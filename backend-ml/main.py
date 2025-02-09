from fastapi import FastAPI
from fastapi.responses import JSONResponse
from db import fetch_table_data
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Create a generic function to fetch table data based on the table name
@app.get("/pipeline/{pipeline_id}")
async def get_pipeline_data(pipeline_id: int):
    # Construct the table name dynamically
    table_name = f"pipeline{pipeline_id}"
    data = fetch_table_data(table_name)
    
    if not data:
        return JSONResponse(status_code=404, content={"message": f"Pipeline {pipeline_id} data not found."})
    
    return data
