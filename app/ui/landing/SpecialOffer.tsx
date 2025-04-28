"use client";

import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOffers(filter: string) {
    try {
      const response = await fetch(`/api/offers?type=${filter}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOffers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch offers");
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchOffers(filter);
  }, [filter]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Special Offers</h1>

      {/* Filter options */}
      <div className="flex gap-4 mb-6">
        {["all", "hotel", "flight", "multi"].map((category) => (
          <label key={category} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value={category}
              checked={filter === category}
              onChange={() => setFilter(category)}
            />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        ))}
      </div>

      {/* Offers grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.id} className="relative">
              <img
                src={offer.imageUrl}
                alt={offer.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded">
                {offer.title}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-500">
            No offers available.
          </div>
        )}
      </div>
    </div>
  );
}