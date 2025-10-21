// TripList.jsx
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
    <div className="bg-white shadow-md border rounded-2xl p-5 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Trips</h2>
      
      {trips.length === 0 ? (
        <p className="text-gray-700 italic">No trips added yet.</p>
      ) : (
        <div className="space-y-3">
          {trips.map(trip => (
            <div key={trip.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
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
                    deleteTrip(trip.id);
                  }}
                  className="text-red-600 hover:text-red-800 ml-2 px-2 py-1 rounded hover:bg-red-50 transition-colors"
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