import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  CheckCircle,
  Leaf,
  AlertTriangle,
  Waves
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

const SolutionPage = () => {
  const [showElements, setShowElements] = useState({
    header: false,
    analysis: false,
    solutions: false
  });

  const [averageUsage, setAverageUsage] = useState(75); 

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, analysis: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, solutions: true })), 900)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const getAnalysisDetails = (average) => {
    if (average < 50) {
      return {
        icon: CheckCircle,
        color: 'emerald',
        message: 'Excellent Water Conservation!',
        description: 'Your water usage is impressively low. Your habits are helping preserve our precious water resources.',
        immediateActions: [
          'Share your conservation methods with friends and family',
          'Consider implementing a rainwater harvesting system',
          'Explore advanced water-saving technologies'
        ],
        longTermTips: [
          'Maintain your current water-saving habits',
          'Document your conservation methods to inspire others',
          'Look for new ways to reduce water usage further'
        ]
      };
    }
    if (average < 100) {
      return {
        icon: Leaf,
        color: 'sky',
        message: 'Good Water Management',
        description: 'Your water consumption is moderate. With a few adjustments, you can reduce it further.',
        immediateActions: [
          'Fix any dripping faucets or leaks',
          'Install water-efficient showerheads',
          'Use a timer for garden watering'
        ],
        longTermTips: [
          'Consider upgrading to water-efficient appliances',
          'Plan a water-efficient garden layout',
          'Implement a greywater system'
        ]
      };
    }
    return {
      icon: AlertTriangle,
      color: 'rose',
      message: 'High Water Consumption',
      description: 'Your water usage is above recommended levels. Lets work on reducing it with some immediate actions.',
      immediateActions: [
          'Check for and fix any water leaks',
          'Reduce shower time by 2-3 minutes',
          'Turn off taps while brushing teeth'
      ],
      longTermTips: [
          'Install low-flow fixtures throughout your home',
          'Replace water-intensive plants with drought-resistant varieties',
          'Consider installing a smart irrigation system'
      ]
    };
  };

  const analysis = getAnalysisDetails(averageUsage);
  const Icon = analysis.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <WaterWave />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className={`mb-12 transition-all duration-500 ${showElements.analysis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className={`bg-${analysis.color}-50 rounded-2xl p-8 shadow-lg`}>
            <div className="flex items-start space-x-4">
              <div className={`bg-${analysis.color}-100 p-3 rounded-xl`}>
                <Icon className={`h-8 w-8 text-${analysis.color}-600`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold text-${analysis.color}-900 mb-2`}>
                  {analysis.message}
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  {analysis.description}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Average Daily Usage:</span>
                  <span className={`text-${analysis.color}-600 font-bold`}>
                    {averageUsage} liters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className={`transition-all duration-500 ${showElements.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 gap-8">
            {/* Immediate Actions */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Immediate Actions</h3>
              <ul className="space-y-2">
                {analysis.immediateActions.map((action, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-sky-500" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Long-term Solutions</h3>
              <ul className="space-y-2">
                {analysis.longTermTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-sky-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolutionPage;
