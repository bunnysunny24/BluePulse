import React, { useState } from 'react';
import { Calendar, Droplet, Timer, TrendingUp, Check, Plus, ChevronLeft, ChevronRight, LineChart, Award, Bell } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DailyTrackPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(0);
  
  const weeklyData = [
    { day: 'Mon', water: 2.1, goal: 2.5 },
    { day: 'Tue', water: 2.3, goal: 2.5 },
    { day: 'Wed', water: 1.9, goal: 2.5 },
    { day: 'Thu', water: 2.4, goal: 2.5 },
    { day: 'Fri', water: 2.2, goal: 2.5 },
    { day: 'Sat', water: 2.5, goal: 2.5 },
    { day: 'Sun', water: 2.0, goal: 2.5 },
  ];
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, title: 'Morning Water (500ml)', completed: false, time: '08:00' },
    { id: 2, title: 'Mid-morning Water (500ml)', completed: false, time: '10:30' },
    { id: 3, title: 'Lunch Water (500ml)', completed: false, time: '13:00' },
    { id: 4, title: 'Afternoon Water (500ml)', completed: false, time: '15:30' },
    { id: 5, title: 'Evening Water (500ml)', completed: false, time: '18:00' },
  ]);

  const toggleTask = (taskId) => {
    setDailyTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addWater = () => {
    setWaterIntake(prev => Math.min(prev + 0.25, 3));
  };

  const calculateProgress = () => {
    return (waterIntake / 2.5) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Today's Progress</span>
                  <div className="flex space-x-4">
                    <button className="p-2 hover:bg-sky-100 rounded-lg">
                      <ChevronLeft className="h-5 w-5 text-sky-600" />
                    </button>
                    <span className="font-medium">{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                    <button className="p-2 hover:bg-sky-100 rounded-lg">
                      <ChevronRight className="h-5 w-5 text-sky-600" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-sky-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <Droplet className="h-5 w-5 text-sky-600" />
                      <span className="text-sm text-sky-600">Water Intake</span>
                    </div>
                    <div className="text-2xl font-bold">{waterIntake}L / 2.5L</div>
                    <div className="w-full bg-sky-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-sky-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-sky-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <Timer className="h-5 w-5 text-sky-600" />
                      <span className="text-sm text-sky-600">Time Active</span>
                    </div>
                    <div className="text-2xl font-bold">5h 23m</div>
                    <div className="text-sm text-gray-600 mt-2">Goal: 8h</div>
                  </div>
                  <div className="bg-sky-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="h-5 w-5 text-sky-600" />
                      <span className="text-sm text-sky-600">Streak</span>
                    </div>
                    <div className="text-2xl font-bold">7 days</div>
                    <div className="text-sm text-gray-600 mt-2">Best: 14 days</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={addWater}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Water (250ml)</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {dailyTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-sky-200 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            task.completed
                              ? 'bg-sky-500 border-sky-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {task.completed && <Check className="h-4 w-4 text-white" />}
                        </button>
                        <span className={task.completed ? 'line-through text-gray-500' : ''}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">{task.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="water" 
                        stroke="#0284c7" 
                        strokeWidth={2}
                        dot={{ fill: '#0284c7' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="goal" 
                        stroke="#94a3b8" 
                        strokeDasharray="5 5"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-sky-600" />
                  <span>Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-gray-500 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => (
                    <button
                      key={i}
                      className={`aspect-square rounded-full text-sm
                        ${i + 1 === selectedDate.getDate()
                          ? 'bg-sky-500 text-white'
                          : 'hover:bg-sky-100'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-sky-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-sky-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">7-Day Streak</span>
                      <Award className="h-5 w-5 text-sky-600" />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Keep up the good work!
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl opacity-60">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">30-Day Milestone</span>
                      <Award className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      23 days remaining
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-sky-50 p-4 rounded-xl">
                  <p className="text-gray-700">
                    Try to drink a glass of water before each meal. This helps with both hydration and portion control!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTrackPage;
