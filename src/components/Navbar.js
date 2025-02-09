import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Droplet, 
  Heart, 
  Sprout, 
  LineChart, 
  Timer, 
  HelpCircle 
} from 'lucide-react';

const Navbar = () => {
  return (
    <header className="py-6 px-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-sky-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-sky-500 text-white p-2 rounded-lg">
              <Droplet className="h-6 w-6" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            BluePulse
            </span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <NavLink to="/about" icon={Heart} text="About" />
          <NavLink to="/Example" icon={LineChart} text="Our Project" />
          <NavLink to="/solution" icon={LineChart} text="Solution" />
          <NavLink to="/dailytrack" icon={Timer} text="Daily Track" />
          <NavLink to="/support" icon={HelpCircle} text="Support" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          {/* Update Sign-In Button to Navigate to Sign-In Page */}
          <Link to="/signin">
            <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
              Sign In
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const NavLink = ({ to, icon: Icon, text }) => (
  <Link 
    to={to}
    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors text-gray-700 hover:text-sky-600"
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </Link>
);

export default Navbar;
