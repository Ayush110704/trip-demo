import React, { useState } from "react";

export default function AddTrip({ onTripAdded }) {
  const [tripName, setTripName] = useState("");
  const [boarding, setBoarding] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hotel, setHotel] = useState("");
  const [address, setAddress] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [transportDetails, setTransportDetails] = useState("");
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberContact, setMemberContact] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const addMember = () => {
    if (memberName.trim()) {
      const newMember = {
        name: memberName,
        contact: memberContact,
        email: memberEmail,
        id: Date.now(),
      };
      setMembers([...members, newMember]);
      setMemberName("");
      setMemberContact("");
      setMemberEmail("");
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const saveTrip = (e) => {
    e.preventDefault();

    if (!tripName.trim() || !destination.trim()) {
      alert("Please fill in Trip Name and Destination");
      return;
    }

    const trips = JSON.parse(localStorage.getItem("trips") || "[]");

    const newTrip = {
      id: Date.now(),
      name: tripName,
      boarding,
      destination,
      startDate,
      endDate,
      accommodation: {
        hotel,
        address,
      },
      transport: {
        mode: transportMode,
        details: transportDetails,
      },
      members,
      createdAt: new Date().toISOString(),
    };

    trips.push(newTrip);
    localStorage.setItem("trips", JSON.stringify(trips));

    // reset form
    setTripName("");
    setBoarding("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    setHotel("");
    setAddress("");
    setTransportMode("");
    setTransportDetails("");
    setMembers([]);

    if (onTripAdded) onTripAdded();

    alert("Trip saved successfully!");
  };

  return (
    <div className="min-h-screen bg-transparent from-blue-50 to-blue-100 flex items-center justify-center py-10 px-4">
      <form
        className="bg-transparent backdrop-blur-md shadow-xl p-8 border border-gray-200 rounded-2xl max-w-2xl w-full"
        onSubmit={saveTrip}
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          ✈️ Add New Trip
        </h2>

        {/* Trip Info */}
        <input
          type="text"
          placeholder="Trip Name *"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Boarding"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={boarding}
          onChange={(e) => setBoarding(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination *"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <div className="flex gap-3 mb-3">
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-1/2 focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-white mt-3">→</span>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-1/2 focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Accommodation */}
        <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">
          🏨 Accommodation
        </h3>
        <input
          type="text"
          placeholder="Hotel / Stay Name"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address / Location"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Transport */}
        <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">
          🚗 Transport
        </h3>
        <input
          type="text"
          placeholder="Mode of Transport (e.g., Flight, Train)"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transport Details (e.g., Flight No., Bus Name)"
          className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
          value={transportDetails}
          onChange={(e) => setTransportDetails(e.target.value)}
        />

        {/* Members */}
        <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">
          👥 Trip Members
        </h3>
        <div className="bg-transparent backdrop-blur-md border border-gray-200 p-5 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              placeholder="Member Name"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={memberContact}
              onChange={(e) => setMemberContact(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            className=" cursor-pointer bg-transparent border-blue-500 border-2  hover:bg-blue-700 text-white rounded-full p-3 mt-6 w-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl"
            onClick={addMember}
          >
            Add Member
          </button>

          {members.length > 0 && (
            <div className="space-y-2">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="mt-5  flex justify-between items-center bg-transparent p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-white">
                    {member.name} - {member.contact}
                  </span>
                  <button
                    type="button"
                    className="cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-100 p-1 rounded transition-colors"
                    onClick={() => removeMember(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="cursor-pointer bg-transparent border-blue-500 border-2  hover:bg-blue-700 text-white rounded-full p-3 mt-6 w-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl"
        >
           Save Trip
        </button>
      </form>
    </div>
  );
}
