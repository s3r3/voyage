import { useEffect, useState } from "react";

interface SpecialOffer {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
}

const SpecialOffers = () => {
  const [offersData, setOffersData] = useState<SpecialOffer[]>([]);
  const [filterOption, setFilterOption] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`/api/offers?type=${filterOption}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const { offers } = await response.json();
      setOffersData(offers || []);
    } catch (error) {
      setError("Failed to fetch offers");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [filterOption]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const renderOffer = (offer: SpecialOffer | undefined, index: number, colSpan: number) => {
    if (!offer) return null;

    return (
      <div key={index} className={`relative col-span-${colSpan} h-[278px] shadow-lg overflow-hidden`}>
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
          {offer.title}
        </h3>
      </div>
    );
  };

  const filterButtons = ["all", "hotel", "flight", "multi"].map((type) => (
    <button
      key={type}
      onClick={() => setFilterOption(type)}
      className={`px-4 py-2 rounded-full transition-colors ${
        filterOption === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {type === "multi" ? "Multi-City" : type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Special Offers</h1>
      <div className="flex gap-4 mb-8">{filterButtons}</div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {offersData.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">No offers available in this category.</p>
        ) : (
          <>
            {renderOffer(offersData[0], 0, 2)}
            {renderOffer(offersData[1], 1, 1)}
            {renderOffer(offersData[2], 2, 2)}
            {renderOffer(offersData[3], 3, 3)}
            {renderOffer(offersData[4], 4, 1)}
            {renderOffer(offersData[5], 5, 1)}
          </>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;