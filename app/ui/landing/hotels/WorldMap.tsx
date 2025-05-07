'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import worldmap from 'public/world-map.jpg';
import clsx from 'clsx';

interface Destination {
  city: string;
  country: string;
  hotel_name: string;
  image: string;
}

const positionMap: Record<string, { top: string; left: string }> = {
  Belgium: { top: '25%', left: '20%' },
  Amsterdam: { top: '20%', left: '70%' },
  Nepal: { top: '45%', left: '45%' },
  'New Jersey': { top: '65%', left: '15%' },
  Gothenburg: { top: '63%', left: '80%' },
};

const tabs = [
  'Special Offers',
  'Last Search',
  'Trending Destinations',
  'Highest Reviewed (1)', // Changed for uniqueness
  'Highest Reviewed (2)', // Changed for uniqueness
];

const WorldMap = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeTab, setActiveTab] = useState('Special Offers');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/hotel');
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error('Failed to fetch hotel data:', error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="relative w-full">
      {/* Tabs Header */}
    <div className="flex rounded-t-md overflow-hidden justify-center">
      {tabs.map((tab) => (
        <button
        key={tab} // The tab key is now unique
        onClick={() => setActiveTab(tab)}
        className={clsx(
          'px-6 py-3 border border-gray-300 text-sm font-semibold transition-transform',
          {
            'bg-white text-blue-800 scale-110 border-none   ': activeTab === tab, // Enlarges the active tab
            'text-gray-700 hover:bg-gray-100 scale-100': activeTab !== tab, // Keeps inactive tabs normal size
          }
        )}
        >
        {tab}
        </button>
      ))}
    </div>

      {/* Map + Pins */}
      <div className="relative w-full h-[600px]">
        <Image
          src={worldmap}
          alt="World Map"
          width={1440}
          height={600}
          objectFit='cover'
          className="h-[498px] bg-cover object-cover w-full"
        />
        <div className="absolute inset-0 opacity-20" />

        {destinations.map((destination, index) => {
          const position = positionMap[destination.city] || { top: '50%', left: '50%' };

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 transition-transform"
              style={{ top: position.top, left: position.left }}
            >
              <div className="bg-white rounded-lg shadow-lg p-2 w-48">
                <Image
                  src={destination.image}
                  alt={destination.city}
                  width={180}
                  height={120}
                  className="rounded-md"
                  unoptimized
                />
                <div className="p-2">
                  <h3 className="font-bold text-lg">{destination.city}</h3>
                  <p className="text-sm text-gray-600">{destination.hotel_name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldMap;
