import React from 'react';
import { Link, useLocation } from 'react-router';

export default function NavBar() {
  const location = useLocation();

  const navItems = [
    { path: '/add-trip', label: 'Add Trip' },
    { path: '/trips', label: 'Your Trips' },
    { path: '/summary', label: 'Trip Summary' },
    { path: '/itinerary', label: 'Itinerary' },
  ];

  return (
    <nav className="  shadow-lg rounded-2xl mb-8 border border-gray-200 ">
      <div className="px-4">
        <div className="flex  gap-10 justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-700 mb-4 sm:mb-0">
            TripPlanner
          </div>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 ">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-all text-white duration-200 text-sm sm:text-base ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}