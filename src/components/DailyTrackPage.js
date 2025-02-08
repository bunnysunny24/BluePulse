import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PipelineDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const pipelines = [
    { id: 1, name: 'Pipeline 1', location: 'North Processing Facility', description: 'Main extraction pipeline for raw materials processing' },
    { id: 2, name: 'Pipeline 2', location: 'East Wing Storage', description: 'Secondary distribution network for finished products' },
    { id: 3, name: 'Pipeline 3', location: 'South Terminal', description: 'Export pipeline connecting to shipping terminal' },
    { id: 4, name: 'Pipeline 4', location: 'West Production Unit', description: 'Primary production line for chemical processing' },
    { id: 5, name: 'Pipeline 5', location: 'Central Storage', description: 'Main storage and distribution pipeline' },
    { id: 6, name: 'Pipeline 6', location: 'Northwest Facility', description: 'Raw material intake and preliminary processing' },
    { id: 7, name: 'Pipeline 7', location: 'Southeast Complex', description: 'Finished product distribution network' },
    { id: 8, name: 'Pipeline 8', location: 'Northeast Wing', description: 'Quality control and testing pipeline' },
    { id: 9, name: 'Pipeline 9', location: 'Southwest Terminal', description: 'Export and shipping preparation line' },
    { id: 10, name: 'Pipeline 10', location: 'Central Processing', description: 'Main processing and refinement pipeline' },
    { id: 11, name: 'Pipeline 11', location: 'Eastern Terminal', description: 'Secondary export and distribution line' },
    { id: 12, name: 'Pipeline 12', location: 'Western Complex', description: 'Auxiliary processing and storage pipeline' }
  ];

  const filteredPipelines = pipelines.filter(pipeline =>
    pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pipeline.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePipelineClick = async (id) => {
    navigate(`/pipeline/${id}`);
    try {
      const response = await fetch(`http://localhost:5000/start-model/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log("Model started successfully");
      } else {
        console.error("Failed to start model");
      }
    } catch (error) {
      console.error("Error starting model:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pipeline Management</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search pipelines..."
            className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPipelines.map((pipeline) => (
          <div 
            key={pipeline.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
            onClick={() => handlePipelineClick(pipeline.id)}
          >
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-500">
                  {pipeline.name}
                </h2>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Location:</span> {pipeline.location}
              </div>
              <p className="text-sm text-gray-500">
                {pipeline.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineDashboard;
