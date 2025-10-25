import React, { useState, useEffect } from 'react';

export default function TripList({ onTripSelect, refresh }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(savedTrips);
  }, [refresh]);

  const deleteTrip = (tripId) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    if (onTripSelect) onTripSelect(null);
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Your Trips
      </h2>
      
      {trips.length === 0 ? (
        <p className="text-gray-700 italic text-center py-4">No trips added yet.</p>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div 
                  className="cursor-pointer flex-1"
                  onClick={() => onTripSelect && onTripSelect(trip)}
                >
                  <h3 className="font-semibold text-lg text-gray-800">{trip.name || 'Unnamed Trip'}</h3>
                  <p className="text-gray-600">
                    {trip.boarding && `${trip.boarding} → `}{trip.destination}
                  </p>
                  <p className="text-sm text-gray-500">
                    {trip.startDate} {trip.endDate && `→ ${trip.endDate}`}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this trip?')) {
                      deleteTrip(trip.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 ml-4 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors duration-200 border border-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}