import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Function to load and preprocess data
def load_data(filename):
    if not os.path.exists(filename):
        raise FileNotFoundError(f"Error: File '{filename}' not found!")
    
    df = pd.read_csv(filename)
    df.rename(columns={'Inlet Flow (L/min)': 'Flow_Inlet', 'Outlet Flow (L/min)': 'Flow_Outlet'}, inplace=True)
    
    if 'Flow_Inlet' not in df.columns or 'Flow_Outlet' not in df.columns:
        raise KeyError("Error: CSV file does not have expected column names.")
    
    df['Flow_Difference'] = df['Flow_Inlet'] - df['Flow_Outlet']
    df['Timestamp'] = pd.to_datetime(df['Timestamp'])
    df['Hour'] = df['Timestamp'].dt.hour
    return df

# Function to train model and compute mean flow difference per hour
def train_model(df):
    features = ['Flow_Inlet', 'Flow_Outlet', 'Hour']
    target = 'Flow_Difference'
    
    X = df[features]
    y = df[target]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    df['Predicted_Flow_Diff'] = model.predict(scaler.transform(df[features]))
    mean_flow_diff = df.groupby('Hour')[['Flow_Inlet', 'Flow_Outlet', 'Flow_Difference', 'Predicted_Flow_Diff']].mean()
    
    return mean_flow_diff, mae, r2

# Running the process for all pipelines
pipeline_count = 12
input_mean = pd.DataFrame()

for i in range(1, pipeline_count + 1):
    filename = f"pipeline{i}.csv"
    try:
        df = load_data(filename)
        mean_flow_diff, mae, r2 = train_model(df)
        input_mean[f'pipeline{i}'] = mean_flow_diff['Predicted_Flow_Diff']
        
        print(f"✅ Model trained successfully for {filename}")
        print(f"📊 Mean Absolute Error (MAE): {mae:.4f}")
        print(f"📈 R² Score: {r2:.4f}")
        
        # Plot graphs
        plt.figure(figsize=(10, 5))
        plt.plot(mean_flow_diff.index, mean_flow_diff['Flow_Inlet'], label='Mean Inlet Flow', marker='o')
        plt.plot(mean_flow_diff.index, mean_flow_diff['Flow_Outlet'], label='Mean Outlet Flow', marker='s')
        plt.plot(mean_flow_diff.index, mean_flow_diff['Flow_Difference'], label='Mean Flow Difference', marker='d')
        plt.xlabel("Hour")
        plt.ylabel("Flow (L/min)")
        plt.title(f"Pipeline {i}: Inlet, Outlet, and Flow Difference")
        plt.legend()
        plt.grid()
        plt.show()
        
        plt.figure(figsize=(10, 5))
        plt.plot(mean_flow_diff.index, mean_flow_diff['Flow_Difference'], label='Actual Mean Flow Difference', marker='o')
        plt.plot(mean_flow_diff.index, mean_flow_diff['Predicted_Flow_Diff'], label='Predicted Mean Flow Difference', marker='x')
        plt.xlabel("Hour")
        plt.ylabel("Flow Difference (L/min)")
        plt.title(f"Pipeline {i}: Actual vs Predicted Flow Difference")
        plt.legend()
        plt.grid()
        plt.show()
    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")

# Save the results to CSV
input_mean.to_csv("input_mean.csv", index_label='Hour')
print("📁 input_mean.csv saved successfully!")
