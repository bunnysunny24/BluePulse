import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  Heart, 
  Sprout, 
  LineChart, 
  Timer,
  HelpCircle,
  Search,
  ArrowUpRight,
  Users,
  Target,
  Award,
  Globe
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

const AboutPage = () => {
  const [showElements, setShowElements] = useState({
    header: false,
    mission: false,
    features: false,
    stats: false,
    team: false
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, header: true })), 300),
      setTimeout(() => setShowElements(prev => ({ ...prev, mission: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, features: true })), 900),
      setTimeout(() => setShowElements(prev => ({ ...prev, stats: true })), 1200),
      setTimeout(() => setShowElements(prev => ({ ...prev, team: true })), 1500)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const NavLink = ({ icon: Icon, text }) => (
    <a 
      href="#" 
      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors text-gray-700 hover:text-sky-600"
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </a>
  );

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="bg-sky-100 p-3 rounded-lg w-fit mb-4">
        <Icon className="h-6 w-6 text-sky-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const TeamMember = ({ name, role, imageUrl }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="font-bold text-lg text-gray-900">{name}</h3>
      <p className="text-sky-600">{role}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <WaterWave />
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className={`mb-24 transition-all duration-700 ${showElements.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl font-black tracking-tight mb-8 bg-gradient-to-r from-sky-900 to-sky-500 bg-clip-text text-transparent">
          Revolutionizing Water Conservation
            <br />
            with AI & IoT
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
          At BluePulse, we believe water conservation should be effortless. Our smart system detects wastage, monitors pressure, and provides actionable insights to optimize your water usage.
          <br />
🚀 Save water. Reduce waste. Build a sustainable future.
<br />
🔵 Join Our Mission
          </p>
          <button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-4 rounded-full flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 transform">
            <span className="text-lg">Join Our Journey</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>

        <div className={`grid grid-cols-2 gap-8 mb-24 transition-all duration-500 ${showElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <FeatureCard 
            icon={Target}
            title="Smart Water Tracking"
            description="Get real-time insights into your water usage and pressure levels, powered by IoT sensors."
          />
          <FeatureCard 
            icon={Sprout}
            title="Intelligent Waste Detection"
            description="Our AI-powered system predicts water wastage patterns and suggests ways to optimize usage."
          />
          <FeatureCard 
            icon={Users}
            title="Community Challenges"
            description="Compete with others in water-saving challenges and track your impact globally."
          />
          <FeatureCard 
            icon={Timer}
            title="Smart Alerts & Reports"
            description="Receive instant alerts on leaks, abnormal usage, and efficiency reports tailored for you."
          />
        </div>

        <div className={`bg-white rounded-2xl p-12 shadow-lg mb-24 transition-all duration-500 ${showElements.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">1M+</div>
              <div className="text-gray-600"> Smart Devices Installed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">5M+</div>
              <div className="text-gray-600">Liters of Water Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">10B+</div>
              <div className="text-gray-600">Data Points Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">150+</div>
              <div className="text-gray-600">Smart Cities Integrated</div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-500 ${showElements.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-4 gap-8">
            <TeamMember 
              name="bhavashesh"
              role="Founder & CEO"
              imageUrl="/api/placeholder/200/200"
            />
            <TeamMember 
              name="bhavashesh"
              role="Head of Design"
              imageUrl="/api/placeholder/200/200"
            />
            <TeamMember 
              name="bhavashesh"
              role="Lead Developer"
              imageUrl="/api/placeholder/200/200"
            />
            <TeamMember 
              name="bhavashesh"
              role="Product Manager"
              imageUrl="/api/placeholder/200/200"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
