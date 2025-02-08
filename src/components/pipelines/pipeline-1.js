import React, { useState } from 'react';
import { Calendar, Droplet, Timer, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PipelineMonitoring = ({ pipelineId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock database data - replace with actual database calls
  const generateWaterUsageData = () => {
    let data = [];
    let total = 0;
    for (let hour = 0; hour < 24; hour++) {
      let blockTotal = 0;
      for (let min = 0; min < 60; min += 10) {
        let amount = Math.floor(Math.random() * 50) + 50; // Random usage between 50-100L
        blockTotal += amount;
        data.push({
          time: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
          amount
        });
      }
      total += blockTotal;
      data.push({ time: `Total ${hour}:00 - ${hour + 1}:00`, amount: blockTotal });
    }
    return data;
  };

  const pipelineData = {
    totalWaterUsed: 2500, // in liters
    operationalTime: "18:45", // in hours:minutes
    waterUsageByHour: generateWaterUsageData(),
    weeklyData: [
      { day: 'Mon', usage: 2100, average: 2500 },
      { day: 'Tue', usage: 2300, average: 2500 },
      { day: 'Wed', usage: 1900, average: 2500 },
      { day: 'Thu', usage: 2400, average: 2500 },
      { day: 'Fri', usage: 2200, average: 2500 },
      { day: 'Sat', usage: 2500, average: 2500 },
      { day: 'Sun', usage: 2000, average: 2500 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Pipeline {pipelineId} Status</span>
                  <div className="flex space-x-4">
                    <button className="p-2 hover:bg-sky-100 rounded-lg">
                      <ChevronLeft className="h-5 w-5 text-sky-600" />
                    </button>
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                    <button className="p-2 hover:bg-sky-100 rounded-lg">
                      <ChevronRight className="h-5 w-5 text-sky-600" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pipelineData.waterUsageByHour.map((reading, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${reading.time.includes('Total') ? 'bg-sky-100 font-bold' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Droplet className="h-5 w-5 text-sky-600" />
                        <span>{reading.time}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sky-600 font-medium">{reading.amount}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Water Usage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={pipelineData.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                    <Line type="monotone" dataKey="average" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineMonitoring;