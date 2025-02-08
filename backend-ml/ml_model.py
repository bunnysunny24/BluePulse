import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1️⃣ Load the dataset
df = pd.read_csv("leakage_detection_dataset.csv")  # Ensure file is in the same directory

# 2️⃣ Display first few rows
print(df.head())

# 3️⃣ Features (input variables) and target variable (output)
X = df[['Flow_A (L/min)', 'Flow_C (L/min)', 'Temperature (°C)', 'Time_of_Day (hr)']]
y = df['Leakage']

# 4️⃣ Split into 80% training and 20% testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5️⃣ Normalize the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 6️⃣ Train the Model - Random Forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)  # Train the model

# 7️⃣ Predict on Test Data
y_pred = model.predict(X_test_scaled)

# 8️⃣ Evaluate Model Accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {accuracy:.2f}")

# Print classification report
print("🔎 Classification Report:")
print(classification_report(y_test, y_pred))

# 9️⃣ Save the Model and Scaler
joblib.dump(model, "leakage_detection_model.pkl")
joblib.dump(scaler, "scaler.pkl")
print("✅ Model and Scaler Saved!")

# 🔟 Load the Model for Prediction
loaded_model = joblib.load("leakage_detection_model.pkl")
scaler = joblib.load("scaler.pkl")
print("✅ Model Loaded Successfully!")

# 🔹 Predict Leakage for a New Sensor Reading (Fix applied here)
# Example new input data
new_data = np.array([[8.0, 7.1, 30, 14]])  # Flow_A, Flow_C, Temperature, Time

# ✅ FIX: Convert `new_data` to a DataFrame with correct feature names
feature_names = ["Flow_A (L/min)", "Flow_C (L/min)", "Temperature (°C)", "Time_of_Day (hr)"]
new_data_df = pd.DataFrame(new_data, columns=feature_names)  # Ensuring correct feature names

# Standardize using the trained scaler
new_data_scaled = scaler.transform(new_data_df)

# Predict Leakage
prediction = loaded_model.predict(new_data_scaled)
print("⚠️ Leakage Detected!" if prediction[0] == 1 else "✅ No Leakage Detected!")

# 📊 Visualization - Flow Difference vs Leakage
df['Flow_Diff'] = df['Flow_A (L/min)'] - df['Flow_C (L/min)']
plt.figure(figsize=(8, 6))
sns.boxplot(x=df['Leakage'], y=df['Flow_Diff'])
plt.xlabel("Leakage (0 = No, 1 = Yes)")
plt.ylabel("Flow Difference (A - C)")
plt.title("Water Flow Difference vs. Leakage")
plt.show()
