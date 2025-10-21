// Itinerary.jsx
import React, { useState, useEffect } from 'react';

export default function Itinerary({ selectedTrip }) {
  const [activities, setActivities] = useState([]);
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedTrip) {
      const savedActivities = JSON.parse(localStorage.getItem(`itinerary_${selectedTrip.id}`) || '[]');
      setActivities(savedActivities);
    } else {
      setActivities([]);
    }
  }, [selectedTrip]);

  const addActivity = () => {
    if (day.trim() && description.trim() && selectedTrip) {
      const newActivity = { day, description, id: Date.now() };
      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);
      localStorage.setItem(`itinerary_${selectedTrip.id}`, JSON.stringify(updatedActivities));
      setDay('');
      setDescription('');
    }
  };

  const deleteActivity = (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
    localStorage.setItem(`itinerary_${selectedTrip.id}`, JSON.stringify(updatedActivities));
  };

  if (!selectedTrip) {
    return (
      <div className="bg-white shadow-md border rounded-2xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Itinerary</h2>
        <p className="text-gray-700 italic">Select a trip to manage itinerary</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md border rounded-2xl p-5 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Itinerary - {selectedTrip.name}</h2>

      <div className="flex gap-2 mb-3">
        <input 
          type="text" 
          placeholder="Day" 
          className="border rounded p-2 w-1/4" 
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Activity Description" 
          className="border rounded p-2 w-full" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button 
          className="bg-green-600 hover:bg-green-700 text-white rounded px-4"
          onClick={addActivity}
        >
          Add
        </button>
      </div>

      {activities.length === 0 ? (
        <p className="text-gray-700 italic">No activities added yet.</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700">
          {activities.map(activity => (
            <li key={activity.id} className="flex justify-between items-center py-1">
              <span>Day {activity.day} — {activity.description}</span>
              <button
                onClick={() => deleteActivity(activity.id)}
                className="text-red-600 hover:text-red-800 text-sm ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}