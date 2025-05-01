"use client";

import { useEffect, useState } from "react";

type Destination = {
  id: number;
  title: string;
  location?: string;
  start_date?: string;
  end_date?: string; // Sesuaikan dengan struktur di tabel Supabase kamu
  description?: string;
  image_url?: string; // Sesuaikan dengan struktur di tabel Supabase kamu
};

export default function Explore() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

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
    }).format(date); // hasil: "25 Jan"
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Explore Stays In Trending Destinations
      </h1>
      <p className="text-lg mb-4">Find Hot Stays!</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <h2>{item.location}</h2>
              <h2>
               {formatDate(item.start_date ?? "")}-{formatDate(item.end_date ?? "")}
              </h2>

              {item.description && (
                <p className="text-gray-600">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
