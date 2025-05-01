import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
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
  const breakpointColumnsObj = {
    default: 3, // untuk layar besar
    1024: 2, // untuk layar sedang
    640: 1, // untuk mobile
  };
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
      <div className="grid grid-cols-5 gap-4 w-full">
        {offersData.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No offers available in this category.
          </p>
        ) : (
          <>
            {/* Kolom 1 – besar */}
            <div className="row-span-1 col-span-2 relative h-[278px] rounded-xl shadow-lg overflow-hidden">
              <img
                src={offersData[0]?.imageUrl}
                alt={offersData[0]?.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/fallback-image.jpg")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {offersData[0]?.title}
              </h3>
            </div>

            {/* Kolom 2 & 3 – atas */}
            {[2].map((i) => (
              <div
                key={i}
                className="relative h-[278px] rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={offersData[i]?.imageUrl}
                  alt={offersData[i]?.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = "/fallback-image.jpg")
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                  {offersData[i]?.title}
                </h3>
              </div>
            ))}

            <div className="row-span-1 col-span-2 relative h-[278px] rounded-xl shadow-lg overflow-hidden">
              <img
                src={offersData[2]?.imageUrl}
                alt={offersData[2]?.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/fallback-image.jpg")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {offersData[0]?.title}
              </h3>
            </div>
            <div className="row-span-1 col-span-3 relative h-[278px] rounded-xl shadow-lg overflow-hidden">
              <img
                src={offersData[3]?.imageUrl}
                alt={offersData[3]?.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/fallback-image.jpg")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                {offersData[0]?.title}
              </h3>
            </div>

            {/* Kolom 2 & 3 – bawah */}

            {[4, 5].map((i) => (
              <div
                key={i}
                className="relative h-[278px] rounded-xl shadow-lg overflow-hidden col-span-1"
              >
                <img
                  src={offersData[i]?.imageUrl}
                  alt={offersData[i]?.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = "/fallback-image.jpg")
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                  {offersData[i]?.title}
                </h3>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
