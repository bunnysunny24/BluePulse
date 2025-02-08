import { useEffect, useState } from "react";

const PipelineDataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/pipeline-data/7-days");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const result = await response.json();
                console.log("API Response:", result); // Debugging log
                
                if (result && result.data) {
                    setData(result.data);
                } else {
                    setData([]); // Ensure data is always an array
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;
    if (data.length === 0) return <p>No data available for the last 7 days.</p>;

    return (
        <div>
            <h2>Pipeline Data (Last 7 Days at 11 AM)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Flow Inlet</th>
                        <th>Flow Outlet</th>
                        <th>Flow Difference</th>
                        <th>Average Time</th>
                        <th>Average Day</th>
                        <th>Average Week</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) => (
                        <tr key={index}>
                            <td>{new Date(entry.timestamp).toLocaleString()}</td>
                            <td>{entry.flow_inlet}</td>
                            <td>{entry.flow_outlet}</td>
                            <td>{entry.flow_difference}</td>
                            <td>{entry.average_time}</td>
                            <td>{entry.average_day}</td>
                            <td>{entry.average_week}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PipelineDataDisplay;
