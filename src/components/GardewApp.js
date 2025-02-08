import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Droplet, 
  Heart, 
  Sprout, 
  LineChart, 
  Timer,
  HelpCircle,
} from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutPage from './AboutPage';
import ReviewPage from './ReviewPage';
import SolutionPage from './SolutionPage';
import DailyTrackPage from './DailyTrackPage';
import SupportPage from './SupportPage';

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

const GardewWebpage = () => {
  const [showElements, setShowElements] = useState({
    title: false,
    tryButton: false,
    leftCard: false,
    middlePlant: false,
    rightCard: false,
    rightPlants: false,
    ratings: false,
    stats: false
  });

  useEffect(() => {
    console.log("Page loaded");
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), 300),
      setTimeout(() => setShowElements(prev => ({ ...prev, tryButton: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, leftCard: true })), 900),
      setTimeout(() => setShowElements(prev => ({ ...prev, middlePlant: true })), 1200),
      setTimeout(() => setShowElements(prev => ({ ...prev, rightCard: true })), 1500),
      setTimeout(() => setShowElements(prev => ({ ...prev, rightPlants: true })), 1800),
      setTimeout(() => setShowElements(prev => ({ ...prev, ratings: true })), 2100),
      setTimeout(() => setShowElements(prev => ({ ...prev, stats: true })), 2400),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const NavLink = ({ to, icon: Icon, text }) => (
    <Link 
      to={to}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors text-gray-700 hover:text-sky-600"
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </Link>
  );

  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="bg-sky-100 p-2 rounded-lg">
          <Icon className="h-6 w-6 text-sky-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
        <WaterWave />
        <main className="max-w-7xl mx-auto px-8 py-12 relative">
          <div className={`grid grid-cols-4 gap-4 mb-12 transition-all duration-500 ${showElements.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <StatCard icon={Droplet} value="2.5L" label="Daily Goal" />
            <StatCard icon={Timer} value="8" label="Alerts Set" />
            <StatCard icon={Sprout} value="12" label="Pipelines Monitored" />
            <StatCard icon={Heart} value="89%" label="Efficiency" />
          </div>
          <div className={`transition-all duration-700 ${showElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-7xl font-black tracking-tight mb-8 bg-gradient-to-r from-sky-900 to-sky-500 bg-clip-text text-transparent">
            Smart Water.
              <br />
              Smarter Future. <span className="relative">
                <img 
                  src="https://5.imimg.com/data5/OQ/JF/MD/SELLER-81676912/cateracterum-palm-plants-1000x1000.jpg" 
                  alt="Plant" 
                  className="absolute -top-4 inline-block mx-2"
                  style={{ width: '80px', height: '100px' }}
                />
              </span> 
            </h1>
          </div>
          <div className={`transition-all duration-500 mb-16 ${showElements.tryButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-4 rounded-full flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 transform">
              <span className="text-lg">Save Water</span>
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className={`col-span-3 transition-all duration-500 delay-100 ${showElements.leftCard ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="bg-gradient-to-br from-sky-100 to-white rounded-3xl p-6 h-65 shadow-lg hover:shadow-xl transition-shadow">
                <Droplet className="h-8 w-8 text-sky-500 mb-4" />
                <h3 className="font-black text-xl text-sky-900">WATER SAVING ESSENTIALS</h3>
                <p className="text-sky-700">Detect, track, and predict water waste using smart sensors and machine learning. Conserve water and improve efficiency effortlessly.</p>
              </div>
            </div>
            <div className={`col-span-6 transition-all duration-500 delay-200 ${showElements.middlePlant ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative flex justify-center">
                <img 
                  src="https://5.imimg.com/data5/OQ/JF/MD/SELLER-81676912/cateracterum-palm-plants-1000x1000.jpg"
                  alt="Plant"
                  className="w-full max-w-md rounded-3xl"
                />
              </div>
            </div>
            <div className={`col-span-3 transition-all duration-500 delay-300 ${showElements.rightCard ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-gradient-to-br from-sky-100 to-white rounded-3xl p-6 h-50 shadow-lg hover:shadow-xl transition-shadow">
                <Sprout className="h-8 w-8 text-sky-500 mb-4" />
                <h3 className="font-black text-xl text-sky-900">GROW WITH US</h3>
                <p className="text-sky-700">We provide solutions to reduce water wastage, optimize usage, and contribute to a sustainable future.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default GardewWebpage;