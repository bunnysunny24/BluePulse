from sqlalchemy import create_engine, Column, Integer, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd
import os
from datetime import datetime

DATABASE_URL = "mysql+pymysql://root:Bunny@localhost/pipeline_ml_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class PipelineData(Base):
    __tablename__ = "pipeline_data"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, nullable=False)
    flow_inlet = Column(Float, nullable=False)
    flow_outlet = Column(Float, nullable=False)
    flow_difference = Column(Float, nullable=False)
    average_time = Column(Float, nullable=True)
    average_day = Column(Float, nullable=True)
    average_week = Column(Float, nullable=True)
Base.metadata.create_all(bind=engine)

folder_path = r"D:\Bunny\newchennaihack\myapp\backend-ml\Multiple"

def upload_csv_from_folder(folder_path):
    if not os.path.exists(folder_path):
        print(f"Folder not found: {folder_path}")
        return

    db = SessionLocal()
    
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".csv"): 
            file_path = os.path.join(folder_path, file_name)
            print(f"Processing file: {file_path}") 
            
            df = pd.read_csv(file_path)
            df['timestamp'] = pd.to_datetime(df['Timestamp'])
            df['flow_difference'] = df['Flow_Inlet (L/min)'] - df['Flow_Outlet (L/min)']

            df['average_time'] = df['flow_difference'].rolling(window=5).mean()
            df['average_day'] = df.groupby(df['timestamp'].dt.date)['flow_difference'].transform('mean')
            df['average_week'] = df.groupby(df['timestamp'].dt.to_period('W'))['flow_difference'].transform('mean')

            df.fillna(0, inplace=True)  

            for _, row in df.iterrows():
                entry = PipelineData(
                    timestamp=row['timestamp'],
                    flow_inlet=row['Flow_Inlet (L/min)'],
                    flow_outlet=row['Flow_Outlet (L/min)'],
                    flow_difference=row['flow_difference'],
                    average_time=row['average_time'],
                    average_day=row['average_day'],
                    average_week=row['average_week']
                )
                db.add(entry)
            
            print(f"File {file_name} processed successfully!") 
    
    db.commit()
    print("All data committed successfully!")  
    db.close()

upload_csv_from_folder(folder_path)
