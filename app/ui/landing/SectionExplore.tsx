"use client";

import { useEffect, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useFavoriteStore } from "app/store/favoriteStore";

type Destination = {
  id: number;
  title: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  image_url?: string;
  rating?: number;
};

const RatingStars = ({ rating }: { rating: number }) => {
  const stars = useMemo(() => {
    const ratingValue = rating / 2;
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < Math.floor(ratingValue);
      const isHalf = index === Math.floor(ratingValue) && ratingValue % 1 >= 0.5;
      return (
        <Icon
          key={index}
          icon={
            isFilled
              ? "material-symbols:star"
              : isHalf
              ? "material-symbols:star-half"
              : "material-symbols:star-outline"
          }
          className="text-yellow-400 w-5 h-5"
        />
      );
    });
  }, [rating]);

  return (
    <div className="flex items-center space-x-1">
      {stars}
    </div>
  );
};

export default function Explore() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const { favoritedStates, toggleFavorite } = useFavoriteStore();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/explore");
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const sortedDestinations = useMemo(() => {
    return destinations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [destinations]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Explore Stays In Trending Destinations</h1>
        <p className="text-lg mt-2">Find Hot Stays!</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedDestinations.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            {item.image_url && (
              <div className="relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 focus:outline-none w-9 h-9 bg-black bg-opacity-70 hover:bg-opacity-100 rounded-full flex items-center justify-center"
                >
                  <Icon
                    icon={
                      favoritedStates[item.id]
                        ? "material-symbols:favorite"
                        : "material-symbols:favorite-outline"
                    }
                    className={`w-5 h-5 transition-colors ${
                      favoritedStates[item.id] ? "text-red-500" : "text-white"
                    }`}
                  />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-2 relative top-[-1.7rem] w-full h-[37px] bg-black px-2   ">
              <RatingStars rating={item.rating || 0} />
              <span className="text-sm text-white">
                {item.rating ? (item.rating / 2).toFixed(1) : "0.0"}
              </span>
            </div>

            <div className="px-4 pb-4">
              <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
              <p className="text-gray-600 mb-1">{item.location}</p>
              <p className="text-gray-500 text-sm">
                {formatDate(item.start_date ?? "")} -{" "}
                {formatDate(item.end_date ?? "")}
              </p>
              {item.description && (
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}