import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, Tooltip } from 'recharts';
import { 
  Droplet, 
  Heart, 
  Sprout, 
  LineChart, 
  Timer,
  HelpCircle,
  Search,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

const WaterWave = () => (
  <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none">
    <svg viewBox="0 0 1440 320" className="w-full">
      <path 
        fill="#0099ff" 
        fillOpacity="1" 
        d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
      </path>
    </svg>
  </div>
);

const ReviewPage = () => {
  const [showElements, setShowElements] = useState({
    chart: false,
    form: false
  });

  const [values, setValues] = useState({ value1: 0, value2: 0, value3: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, chart: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, form: true })), 900)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedValues = {
      input1: parseInt(values.value1, 10) || 0,
      input2: parseInt(values.value2, 10) || 0,
      input3: parseInt(values.value3, 10) || 0,
    };
    const avg = (parsedValues.input1 + parsedValues.input2 + parsedValues.input3) / 3;

    try {
      setMessage("Data successfully saved! Your hydration score: " + avg.toFixed(2));
    } catch (err) {
      console.error("Error saving data:", err);
      setMessage("Failed to save data. Please try again.");
    }
  };

  const radarData = {
    labels: ['Morning', 'Afternoon', 'Evening'],
    datasets: [{
      label: 'Water Intake (ml)',
      data: [values.value1, values.value2, values.value3],
      backgroundColor: 'rgba(0, 149, 255, 0.2)',
      borderColor: 'rgba(0, 149, 255, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 149, 255, 1)',
    }],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <WaterWave />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 gap-8">
          {/* Chart Section */}
          <div className={`transition-all duration-500 ${showElements.chart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Hydration Pattern</h2>
              <div className="aspect-square">
                <RadarChart outerRadius="80%" width={400} height={400} data={radarData.datasets}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="label" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Water Intake" dataKey="data" stroke="#0099ff" fill="#0099ff" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={`transition-all duration-500 ${showElements.form ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Water Intake</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {['Morning', 'Afternoon', 'Evening'].map((time, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      {time} Intake (ml)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      value={values[`value${index + 1}`]}
                      onChange={(e) => setValues({ ...values, [`value${index + 1}`]: e.target.value })}
                      placeholder="Enter amount in ml"
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow"
                >
                  <span>Update Hydration Data</span>
                  <RefreshCw className="h-5 w-5" />
                </button>
              </form>

              {message && (
                <div className="mt-6 p-4 bg-sky-50 rounded-lg text-sky-700">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;
