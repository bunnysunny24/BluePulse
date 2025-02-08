import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pipeline = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Pipeline ID is missing");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pipeline-data/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pipeline data");
        }
        const result = await response.json();

        // Ensure result.data is an array
        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format");
        }

        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pipeline Data - {id}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Input (L/min)</th>
            <th className="border p-2">Output (L/min)</th>
            <th className="border p-2">Difference (L/min)</th>
            <th className="border p-2">7-Day Avg Input</th>
            <th className="border p-2">7-Day Avg Output</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="border p-2">{item?.[0] ?? "N/A"}</td>
              <td className="border p-2">
                {(item?.[1] ?? 0).toFixed(2)}
              </td>
              <td className="border p-2">
                {(item?.[2] ?? 0).toFixed(2)}
              </td>
              <td className="border p-2">
                {((item?.[1] ?? 0) - (item?.[2] ?? 0)).toFixed(2)}
              </td>
              <td className="border p-2">
                {(item?.[3] ?? 0).toFixed(2)}
              </td>
              <td className="border p-2">
                {(item?.[4] ?? 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pipeline;
