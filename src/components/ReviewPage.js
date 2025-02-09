import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pipeline = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

 

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0A66C2",
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        Pipeline {id} Data
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <img
          src={`/graphs/pipeline${id}_flow_comparison.png`}
          alt={`Pipeline ${id} Flow Comparison`}
          style={{ width: "45%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        />
        <img
          src={`/graphs/pipeline${id}_actual_vs_predicted.png`}
          alt={`Pipeline ${id} Actual vs Predicted`}
          style={{ width: "45%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="🔍 Search Pipeline Data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "50%",
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "25px",
            border: "1px solid #0A66C2",
            outline: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <div style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}>
        <table
          style={{
            width: "90%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#0A66C2",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px 16px" }}>ID</th>
              <th style={{ padding: "12px 16px" }}>Timestamp</th>
              <th style={{ padding: "12px 16px" }}>Inlet Flow</th>
              <th style={{ padding: "12px 16px" }}>Outlet Flow</th>
              <th style={{ padding: "12px 16px" }}>Average Per Hour</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#EAF4FF" : "white",
                    textAlign: "left",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{item.id}</td>
                  <td style={{ padding: "12px 16px" }}>{item.Timestamp}</td>
                  <td style={{ padding: "12px 16px" }}>{item.InletFlow}</td>
                  <td style={{ padding: "12px 16px" }}>{item.OutletFlow}</td>
                  <td style={{ padding: "12px 16px" }}>{item.AveragePerHour}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: "12px 16px", textAlign: "center", color: "gray" }}>
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pipeline;
