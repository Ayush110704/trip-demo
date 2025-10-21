// AddTrip.jsx
import React, { useState } from 'react';

export default function AddTrip({ onTripAdded }) {
  const [tripName, setTripName] = useState('');
  const [boarding, setBoarding] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [address, setAddress] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [transportDetails, setTransportDetails] = useState('');
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [memberContact, setMemberContact] = useState('');
  const [memberEmail, setMemberEmail] = useState('');

  console.log('AddTrip component rendered');
  console.log('Current members:', members);

  const addMember = () => {
    console.log('Adding member:', { memberName, memberContact, memberEmail });
    if (memberName.trim()) {
      const newMember = {
        name: memberName,
        contact: memberContact,
        email: memberEmail,
        id: Date.now()
      };
      setMembers([...members, newMember]);
      setMemberName('');
      setMemberContact('');
      setMemberEmail('');
      console.log('Member added successfully');
    } else {
      console.log('Member name is empty, cannot add member');
    }
  };

  const removeMember = (index) => {
    console.log('Removing member at index:', index);
    setMembers(members.filter((_, i) => i !== index));
    console.log('Member removed successfully');
  };

  const saveTrip = (e) => {
    e.preventDefault();
    
    console.log('Saving trip...');
    console.log('Trip data:', {
      tripName,
      boarding,
      destination,
      startDate,
      endDate,
      hotel,
      address,
      transportMode,
      transportDetails,
      members
    });

    if (!tripName.trim() || !destination.trim()) {
      console.log('Validation failed: Trip Name and Destination are required');
      alert('Please fill in Trip Name and Destination');
      return;
    }

    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    console.log('Existing trips from localStorage:', trips);

    const newTrip = {
      id: Date.now(),
      name: tripName,
      boarding: boarding,
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      accommodation: {
        hotel: hotel,
        address: address
      },
      transport: {
        mode: transportMode,
        details: transportDetails
      },
      members: members,
      createdAt: new Date().toISOString()
    };

    console.log('New trip object:', newTrip);

    trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(trips));
    console.log('Trip saved to localStorage');

    // Reset form
    setTripName('');
    setBoarding('');
    setDestination('');
    setStartDate('');
    setEndDate('');
    setHotel('');
    setAddress('');
    setTransportMode('');
    setTransportDetails('');
    setMembers([]);

    console.log('Form reset successfully');

    if (onTripAdded) {
      console.log('Calling onTripAdded callback');
      onTripAdded();
    }
    
    alert('Trip saved successfully!');
  };

  return (
    <form className="bg-white shadow-md p-4 border rounded-lg mb-6" onSubmit={saveTrip}>
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Trip</h2>

      <input 
        type="text" 
        placeholder="Trip Name *" 
        className="border rounded p-2 w-full mb-2" 
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        required
      />
      <input 
        type="text" 
        placeholder="Boarding" 
        className="border rounded p-2 w-full mb-2" 
        value={boarding}
        onChange={(e) => setBoarding(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Destination *" 
        className="border rounded p-2 w-full mb-2" 
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <input 
          type="date" 
          className="border rounded p-2 w-1/2" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input 
          type="date" 
          className="border rounded p-2 w-1/2" 
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Accommodation</h3>
      <input 
        type="text" 
        placeholder="Hotel / Stay Name" 
        className="border rounded p-2 w-full mb-2" 
        value={hotel}
        onChange={(e) => setHotel(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Address / Location" 
        className="border rounded p-2 w-full mb-2" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Transport</h3>
      <input 
        type="text" 
        placeholder="Mode of Transport (e.g., Flight, Train)" 
        className="border rounded p-2 w-full mb-2" 
        value={transportMode}
        onChange={(e) => setTransportMode(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Transport Details (e.g., Flight No., Bus Name)" 
        className="border rounded p-2 w-full mb-2" 
        value={transportDetails}
        onChange={(e) => setTransportDetails(e.target.value)}
      />

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Trip Members</h3>
      <div className="border p-3 rounded-md">
        <input 
          type="text" 
          placeholder="Member Name" 
          className="border rounded p-2 w-full mb-2" 
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Contact Number" 
          className="border rounded p-2 w-full mb-2" 
          value={memberContact}
          onChange={(e) => setMemberContact(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email (optional)" 
          className="border rounded p-2 w-full mb-2" 
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />

        <button
          type="button"
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 rounded p-2 w-full mb-4"
          onClick={addMember}
        >
          + Add Member
        </button>

        {members.map((member, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded mb-2">
            <span>{member.name} - {member.contact}</span>
            <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => removeMember(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2 mt-3 w-full"
      >
        Save Trip
      </button>
    </form>
  );
}