'use client';

import { useEffect, useState } from 'react';

interface Offer {
  id: string;
  title: string;
  image: string;
}

const SpecialOffersHotels: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/specialOffers');
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error('Failed to fetch offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const colSpanMap: Record<number, string> = {
    0: 'col-span-1',
    1: 'col-span-2',
    2: 'col-span-1',
    3: 'col-span-1',
    4: 'col-span-2',
    5: 'col-span-1',
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading offers...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Special Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`relative rounded-lg overflow-hidden h-[300px] ${
              colSpanMap[index] || 'col-span-1'
            }`}
          >
            <div className="group cursor-pointer relative h-full overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#07689F] text-white px-4 py-2 rounded inline-flex items-center gap-2">
                  <span className="font-medium">{offer.title}</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersHotels;
