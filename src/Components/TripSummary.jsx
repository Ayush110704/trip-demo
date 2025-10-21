// TripSummary.jsx
import React from 'react';

export default function TripSummary({ selectedTrip }) {
  if (!selectedTrip) {
    return (
      <div className="bg-white shadow-md border rounded-2xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Trip Summary</h2>
        <p className="text-gray-700 italic">Select a trip to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md border rounded-2xl p-5 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Trip Summary</h2>

      <p><strong>Name:</strong> {selectedTrip.name}</p>
      <p><strong>Boarding:</strong> {selectedTrip.boarding}</p>
      <p><strong>Destination:</strong> {selectedTrip.destination}</p>
      <p><strong>Dates:</strong> {selectedTrip.startDate} → {selectedTrip.endDate}</p>

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Accommodation</h3>
      <p><strong>Hotel:</strong> {selectedTrip.accommodation.name || 'Not specified'}</p>
      <p><strong>Address:</strong> {selectedTrip.accommodation.address || 'Not specified'}</p>

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Transport</h3>
      <p><strong>Mode:</strong> {selectedTrip.transport.mode || 'Not specified'}</p>
      <p><strong>Details:</strong> {selectedTrip.transport.details || 'Not specified'}</p>

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Trip Members</h3>
      {selectedTrip.members.length === 0 ? (
        <p className="text-gray-600 italic">No members added</p>
      ) : (
        <ul className="list-disc list-inside">
          {selectedTrip.members.map((member, index) => (
            <li key={index}>
              {member.name} — {member.contact} 
              {member.email && ` — ${member.email}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}