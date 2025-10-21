// App.jsx
import React, { useState } from 'react';
import AddTrip from './components/AddTrip';
import TripList from './components/TripList';
import TripSummary from './components/TripSummary';
import Itinerary from './components/Itinerary'; 

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [refreshTrips, setRefreshTrips] = useState(false);

  const handleTripAdded = () => {
    setRefreshTrips(prev => !prev);
    setSelectedTrip(null);
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  return (
    <div className="app-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">TripPlanner</h1>
          <p className="text-lg text-blue-600">Plan your adventures with ease</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AddTrip onTripAdded={handleTripAdded} />
           
          </div>

          {/* Right Column */}
          <div className="space-y-6">
             <TripList 
              onTripSelect={handleTripSelect} 
              refresh={refreshTrips} 
            />
            <TripSummary selectedTrip={selectedTrip} />
            <Itinerary selectedTrip={selectedTrip} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p>© 2024 TripPlanner - Your Ultimate Travel Companion</p>
        </footer>
      </div>
    </div>
  );
}

export default App;