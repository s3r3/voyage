"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface Offer {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filter, setFilter] = useState<string>("all");

  async function fetchOffersByType(filter: string) {
    try {
      let query = supabase.from("Offer").select("*");

      if (filter !== "all") {
        query = query.eq("type", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  useEffect(() => {
    fetchOffersByType(filter);
  }, [filter]);

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