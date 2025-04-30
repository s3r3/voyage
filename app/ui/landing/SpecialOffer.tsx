import Image from "next/image";
import { useEffect, useState } from "react";

// Interface untuk data offers
interface SpecialOffer {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
}

export default function SpecialOffers() {
  // State untuk menampung data offers
  const [offersData, setOffersData] = useState<SpecialOffer[]>([]);
  const [filterOption, setFilterOption] = useState<string>("all");
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fungsi untuk mengambil data offers berdasarkan filter
  const fetchOffers = async (filterValue: string) => {
    setLoadingStatus(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/offers?type=${filterValue}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const { offers } = await response.json();
      setOffersData(offers || []);
    } catch (error) {
      setErrorMessage("Failed to fetch offers");
      console.error("Fetch error:", error);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchOffers(filterOption);
  }, [filterOption]);

  // Kondisi jika masih loading atau ada error
  if (loadingStatus) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="p-6 text-center text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Special Offers</h1>

      {/* Filter options */}
      <div className="flex justify-center gap-6 mb-8">
        {["all", "hotel", "flight", "multi"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterOption(type)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filterOption === type
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
        {offersData.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No offers available in this category.
          </p>
        ) : (
          offersData.map((offer) => (
            <div
              key={offer.id}
              className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={offer.imageUrl}
                alt={offer.title}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/fallback-image.jpg"; // Fallback image jika gambar gagal dimuat
                }}
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
