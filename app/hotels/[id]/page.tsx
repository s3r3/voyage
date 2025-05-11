"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  discount_percentage: number;
  price_per_night: number;
  description: string;
  booking_url: string;
  hotel_images: { image_url: string }[];
  hotel_services: { services: { name: string } }[]; // Disesuaikan sesuai struktur data
}

function HotelDetail() {
  const params = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`/api/hotels?id=${params.id}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch hotel data");
        }

        const data = await response.json();
        setHotel(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{hotel.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {hotel.hotel_images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {hotel.hotel_images.slice(0, 5).map((img, idx) => (
                <img
                  key={idx}
                  src={img.image_url}
                  alt={`${hotel.name} image ${idx + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <p className="text-gray-600 mb-4">{hotel.description}</p>
          <p className="text-gray-600 mb-4"><strong>Address:</strong> {hotel.address}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1 text-gray-700">{hotel.rating}</span>
          </div>
          <div className="flex items-baseline mb-4">
            {hotel.discount_percentage > 0 ? (
              <>
                <span className="text-lg font-bold text-red-600 mr-2">
                  Rp
                  {(
                    hotel.price_per_night *
                    (1 - hotel.discount_percentage / 100)
                  ).toLocaleString("id-ID")}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  Rp{hotel.price_per_night.toLocaleString("id-ID")}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-green-600">
                Rp{hotel.price_per_night.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {/* Menampilkan layanan hotel */}
          <div className="text-gray-600 mb-4">
            <strong>Services:</strong>
            <ul>
              {/* Mengecek apakah hotel_services ada dan bukan undefined */}
              {hotel.hotel_services?.map((service, idx) => {
                return service.services ? (
                  <li key={idx} className="text-gray-600">
                    {service.services.name} {/* Mengakses name secara langsung */}
                  </li>
                ) : null; // Cek jika `services` tidak ada
              })}
            </ul>
          </div>

          <a
            href={hotel.booking_url}
            className="inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;
