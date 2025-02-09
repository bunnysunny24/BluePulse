import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


df = pd.read_csv("leakage_detection_dataset.csv")

df['Flow_Diff'] = df['Flow_A (L/min)'] - df['Flow_C (L/min)']

avg_flow_a = df['Flow_A (L/min)'].mean()
avg_flow_c = df['Flow_C (L/min)'].mean()
avg_flow_diff = df['Flow_Diff'].mean()

print(f"📊 Average Flow A: {avg_flow_a:.2f} L/min")
print(f"📊 Average Flow C: {avg_flow_c:.2f} L/min")
print(f"📊 Average Flow Difference: {avg_flow_diff:.2f} L/min")

plt.figure(figsize=(12, 5))
plt.plot(df.index, df['Flow_A (L/min)'], label="Flow_A (Input)", color='blue')
plt.plot(df.index, df['Flow_C (L/min)'], label="Flow_C (Output)", color='green')
plt.plot(df.index, df['Flow_Diff'], label="Flow Difference (A - C)", color='red', linestyle='dashed')
plt.xlabel("Sample Index")
plt.ylabel("Flow Rate (L/min)")
plt.title("Flow Rates Over Time")
plt.legend()
plt.grid()
plt.show()

plt.figure(figsize=(6, 4))
plt.bar(["Flow_A (Input)", "Flow_C (Output)", "Flow Difference"], 
        [avg_flow_a, avg_flow_c, avg_flow_diff], 
        color=['blue', 'green', 'red'])
plt.ylabel("Average Flow Rate (L/min)")
plt.title("Average Flow Values")
plt.show()
