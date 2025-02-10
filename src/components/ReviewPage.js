import React from "react";
import { useParams } from "react-router-dom";

const Pipeline = () => {
  const { id } = useParams();

  return (
    <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#0A66C2", fontSize: "32px", marginBottom: "20px" }}>
        Pipeline {id} Data
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "30px", flexWrap: "wrap" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333", backgroundColor: "#EAF4FF", padding: "15px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          📊 Mean Absolute Error (MAE): <span style={{ color: "#0A66C2" }}>0.0205</span>
        </div>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333", backgroundColor: "#EAF4FF", padding: "15px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          📈 R² Score: <span style={{ color: "#0A66C2" }}>0.9795</span>
        </div>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333", backgroundColor: "#EAF4FF", padding: "15px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          🎯 Accuracy: <span style={{ color: "#0A66C2" }}>97.95%</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", justifyContent: "center", alignItems: "center" }}>
        {[1, 2, 3, 4].map((num) => (
          <img
            key={num}
            src={`/graphs/iot_${num}.jpeg`}
            alt={`IoT Graph ${num}`}
            style={{ width: "100%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Pipeline;
