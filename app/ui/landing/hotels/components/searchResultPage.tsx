"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MapComponent from "app/ui/components/_MapComponent/MapComponentWrapper";
import { Hotel, HotelSearchResult } from "app/api/types";
import SearchHotelForm from "../../components/SearchHotelForm";
import Header from "app/ui/shared/Header";
import Navigation from "../../components/Navigation";

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState<HotelSearchResult>({
    hotels: [],
    city: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const adults = searchParams.get("adults");
  const rooms = searchParams.get("rooms");
  const children = searchParams.get("children");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  useEffect(() => {
    const fetchHotels = async () => {
      if (!location) {
        setError("Please provide a location for the search.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          location: location,
          ...(adults && { adult: adults }),
          ...(rooms && { room: rooms }),
          ...(children && { child: children }),
          ...(checkin && { "check-in": checkin }),
          ...(checkout && { "check-out": checkout }),
        }).toString();
        const response = await fetch(`/api/hotelsearch?${query}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch search results"
          );
        }

        const data: HotelSearchResult = await response.json();
        setSearchResults(data);
      } catch (err: any) {
        console.error("Error fetching search results:", err);
        setError(err.message || "An unexpected error occurred.");
        setSearchResults({ hotels: [], city: null });
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location, adults, rooms, children, checkin, checkout]);

  const mapCenter: [number, number] | null = searchResults.city
    ? [searchResults.city.latitude, searchResults.city.longitude]
    : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (
    !searchResults ||
    !searchResults.hotels ||
    searchResults.hotels.length === 0
  ) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No hotels found for your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 lg:px-0">
      <div className="pb-10">
        <Header />
        <Navigation />
        <SearchHotelForm />
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-10">
        <div className="md:w-1/2">
          <MapComponent center={mapCenter} hotels={searchResults.hotels} />
        </div>
        <div className="md:w-1/2">
          <div className="mb-8 pb-10"></div>
          {searchResults.city && (
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Hotels in {searchResults.city.name}
              </h2>
              <p className="text-gray-600">{searchResults.city.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="md:mt-10 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={
                    hotel.hotel_images[0]?.image_url || "/placeholder-image.jpg"
                  }
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.vip_available && (
                  <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    VIP Available
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {hotel.name}
                </h3>
                <p className="text-sm text-gray-600">{hotel.address}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-gray-700">
                    {hotel.rating.toFixed(1)}
                  </span>
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
                <div className="mt-4">
                  <a
                    href={`/hotels/${hotel.id}`}
                    className="inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    See Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
