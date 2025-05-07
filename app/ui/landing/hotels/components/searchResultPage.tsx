"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// Import komponen-komponen UI yang dibutuhkan (misalnya, HotelCard)
// import HotelCard from './HotelCard'; // Contoh

interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  price_per_night: number;
  discount_percentage: number;
  vip_available: boolean;
  hotel_images: { image_url: string }[];
  hotel_services: { services: { name: string } }[];
}

interface SearchResultsData {
    hotels: Hotel[];
    city: {
        id: string;
        name: string;
        description: string;
        latitude: number;
        longitude: number;
    } | null; // Bisa null jika tidak ada kota yang cocok
}


function SearchResultsPage() {
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults] = useState<SearchResultsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const location = searchParams.get('location') || '';
        const checkIn = searchParams.get('checkIn') || '';
        const checkOut = searchParams.get('checkOut') || '';
        const guests = searchParams.get('guests') || '';
        const rooms = searchParams.get('rooms') || '';
        const vip = searchParams.get('vip') || '';

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                // Membangun URL API dengan parameter dari URL
                const apiUrl = `/api/hotelsearch?${searchParams.toString()}`; // Menggunakan semua param

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data: SearchResultsData = await response.json();
                setSearchResults(data);
            } catch (err) {
                console.error("Failed to fetch search results:", err);
                setError("Failed to load search results.");
            } finally {
                setLoading(false);
            }
        };

        if (location) { // Hanya fetch jika lokasi ada
            fetchResults();
        } else {
            setLoading(false); // Tidak ada lokasi untuk dicari
            // Optionally, set an error or message
        }

    }, [searchParams]); // Bergantung pada searchParams agar fetch ulang jika URL berubah

    if (loading) {
        return <div>Loading results...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!searchResults || searchResults.hotels.length === 0) {
        return <div>No hotels found for your search criteria.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Tampilkan info kota jika ada */}
            {searchResults.city && (
                <div>
                    <h2>Hotels in {searchResults.city.name}</h2>
                    <p>{searchResults.city.description}</p>
                    {/* Mungkin tampilkan peta di sini, memusatkan di kota */}
                    {/* <MapComponent center={{lat: searchResults.city.latitude, lng: searchResults.city.longitude}} hotels={searchResults.hotels} /> */}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {searchResults.hotels.map(hotel => (
                    // Render komponen kartu hotel untuk setiap hotel
                    // <HotelCard key={hotel.id} hotel={hotel} /> // Anda perlu membuat komponen HotelCard
                    <div key={hotel.id} className="border p-4 rounded shadow">
                        <h3>{hotel.name}</h3>
                        <p>{hotel.address}</p>
                        <p>Rating: {hotel.rating}</p>
                        <p>Price: ${hotel.price_per_night.toFixed(2)}</p>
                        {/* Tampilkan gambar */}
                        <div className="flex overflow-x-auto space-x-2 mt-2">
                            {hotel.hotel_images.map((img, index) => (
                                <img key={index} src={img.image_url} alt={`Image of ${hotel.name}`} className="w-32 h-auto object-cover rounded" />
                            ))}
                        </div>
                        {/* Tampilkan layanan */}
                        <div className="mt-2">
                            <strong>Services:</strong>
                            <ul>
                                {hotel.hotel_services.map((service, index) => (
                                    <li key={index}>- {service.services.name}</li>
                                ))}
                            </ul>
                        </div>
                         {/* Tampilkan info lain seperti deskripsi, VIP, diskon */}
                         <p className="text-sm mt-2">{hotel.description.substring(0, 100)}...</p>
                         {hotel.discount_percentage > 0 && (
                             <p className="text-green-600">Discount: {hotel.discount_percentage}%</p>
                         )}
                         {hotel.vip_available && (
                              <p className="text-blue-600">VIP Available</p>
                         )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResultsPage; // Pastikan ini di export