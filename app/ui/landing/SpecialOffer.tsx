"use client";

import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import Image from "next/image";

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

  const debouncedFetchOffers = debounce((filterValue: string) => {
    fetchOffers(filterValue);
  }, 300);

  async function fetchOffers(filterValue: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/offers?type=${filterValue}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const { offers } = await response.json(); // Adjusted to match API response
      setOffers(offers || []);
    } catch (err) {
      setError("Failed to fetch offers");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    debouncedFetchOffers(filter);
    return () => debouncedFetchOffers.cancel();
  }, [filter]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Special Offers</h1>

      {/* Filter options */}
      <div className="flex justify-center gap-6 mb-8">
        {["all", "hotel", "flight", "multi"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type === "multi"
              ? "Multi-City"
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Offers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No offers available in this category.
          </p>
        ) : (
          offers.map((offer) => (
            <div
              key={offer.id}
              className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={offer.imageUrl}
                alt={offer.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {offer.title}
              </h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
