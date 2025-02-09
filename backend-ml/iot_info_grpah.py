import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import matplotlib.pyplot as plt

def load_data(filename):
    if not os.path.exists(filename):
        raise FileNotFoundError(f"Error: File '{filename}' not found!")
    
    df = pd.read_csv(filename)

    required_columns = ['timestamp', 'inlet', 'outlet', 'difference']
    if not all(col in df.columns for col in required_columns):
        raise KeyError("Error: CSV file does not have expected column names.")

    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['hour'] = df['timestamp'].dt.hour
    df['minute'] = df['timestamp'].dt.minute
    df['second'] = df['timestamp'].dt.second

    return df

def train_model(df):
    features = ['inlet', 'outlet', 'hour', 'minute', 'second']
    target = 'difference'  
    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.1, random_state=42)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)

    test_timestamps = df.iloc[X_test.index]['timestamp']

    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    return model, mae, r2, y_test, y_pred, test_timestamps, df

def plot_graphs(df, y_test, y_pred, test_timestamps):
    plt.figure(figsize=(12, 5))
    plt.plot(df['timestamp'], df['inlet'], label='Inlet Flow', color='blue')
    plt.plot(df['timestamp'], df['outlet'], label='Outlet Flow', color='green')
    plt.xlabel('Time')
    plt.ylabel('Flow (L/min)')
    plt.title('Inlet and Outlet Flow Over Time')
    plt.legend()
    plt.xticks(rotation=45)
    plt.grid()
    plt.show()
    plt.figure(figsize=(12, 5))
    plt.plot(df['timestamp'], df['difference'], label='Actual Flow Difference', color='red')
    plt.xlabel('Time')
    plt.ylabel('Difference (L/min)')
    plt.title('Actual Flow Difference Over Time')
    plt.legend()
    plt.xticks(rotation=45)
    plt.grid()
    plt.show()
    plt.figure(figsize=(12, 5))
    plt.plot(test_timestamps, y_test, label="Actual Flow Difference", color='red', linewidth=2)
    plt.plot(test_timestamps, y_pred, label="Predicted Flow Difference", linestyle='dashed', color='blue', linewidth=2)
    plt.xlabel('Time')
    plt.ylabel('Flow Difference (L/min)')
    plt.title('Actual vs Predicted Flow Difference Over Time')
    plt.legend()
    plt.xticks(rotation=45)
    plt.grid()
    plt.show()
    plt.figure(figsize=(8, 6))
    plt.scatter(y_test, y_pred, alpha=0.6, color='blue', edgecolors='black')
    min_val = min(min(y_test), min(y_pred))
    max_val = max(max(y_test), max(y_pred))
    plt.plot([min_val, max_val], [min_val, max_val], linestyle="dashed", color="red", label="Perfect Fit")
    plt.xlabel('Actual Flow Difference')
    plt.ylabel('Predicted Flow Difference')
    plt.title('Actual vs. Predicted Flow Difference')
    plt.legend()
    plt.grid()
    plt.show()

if __name__ == "__main__":
    filename = "iot_data.csv"  

    try:
        df = load_data(filename)
        model, mae, r2, y_test, y_pred, test_timestamps, df = train_model(df)

        print(f"✅ Model trained successfully for {filename}")
        print(f"📊 Mean Absolute Error (MAE): {mae:.4f}")
        print(f"📈 R² Score: {r2:.4f}")
        plot_graphs(df, y_test, y_pred, test_timestamps)

    except Exception as e:
        print(f"❌ Error: {e}")
