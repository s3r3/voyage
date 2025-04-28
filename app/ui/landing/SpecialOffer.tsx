// app/ui/landing/SpecialOffer.tsx

"use client";

import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  type: string;
  image_url: string;
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Fungsi untuk mengambil penawaran dari API
    async function fetchOffers() {
      try {
        const res = await fetch(`/api/offers?type=${filter}`);
        if (res.ok) {
          const data = await res.json();
          setOffers(data);
        } else {
          console.error("Failed to fetch offers");
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    }

    fetchOffers();
  }, [filter]); // Re-fetch saat filter berubah

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
                src={offer.image_url}
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