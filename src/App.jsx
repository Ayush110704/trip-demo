import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import AddTrip from './AddTrip';
import TripList from './TripList';
import TripSummary from './TripSummary';
import Itinerary from './Itinerary'; 
import bg1 from './assets/bg1.jpg';

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [refreshTrips, setRefreshTrips] = useState(false);

  const handleTripAdded = () => {
    setRefreshTrips(prev => !prev);
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  return (
    // ✅ Background image applied here
  <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center py-10 px-4"
        style={{
          backgroundImage: `url(${bg1})`,
        }}
      >
      <div>
        <div className="container mx-auto px-1 py-8 max-w-6xl">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/add-trip" replace />} />
            <Route
              path="/add-trip"
              element={<AddTrip onTripAdded={handleTripAdded} />}
            />
            <Route
              path="/trips"
              element={
                <TripList
                  onTripSelect={handleTripSelect}
                  refresh={refreshTrips}
                />
              }
            />
            <Route
              path="/summary"
              element={<TripSummary selectedTrip={selectedTrip} />}
            />
            <Route
              path="/itinerary"
              element={<Itinerary selectedTrip={selectedTrip} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
