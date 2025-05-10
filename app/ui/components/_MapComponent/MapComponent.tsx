"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// Import tipe Hotel dari file tipe yang dibagikan
import { Hotel } from "app/api/types";
import * as Leaflet from "leaflet"; // Import Leaflet secara eksplisit

// Deklarasikan L di luar blok 'if'
let L: any; // Declare L here to use it globally
// Dynamic import of Leaflet and apply fix
if (typeof window !== "undefined") {
  import("leaflet")
    .then((leaflet) => {
      L = leaflet; // Inisialisasi L di sini setelah Leaflet dimuat

      // Terapkan perbaikan hanya setelah Leaflet dimuat
      (L.Icon.Default.prototype as any)._getIconUrl = undefined;

      L.Icon.Default.mergeOptions({
        // Corrected paths - remove 'public/' prefix, assuming images are in public/images
        iconUrl: "/images/marker-icon.png",
        iconRetinaUrl: "/images/marker-icon-2x.png",
        shadowUrl: "/images/marker-shadow.png",
      });
    })
    .catch((err) => console.error("Failed to load Leaflet:", err));
}

// Komponen untuk menangani perubahan pusat peta
interface ChangeViewProps {
  center: [number, number] | null; // Izinkan pusat menjadi null awalnya
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMapEvents({});
  // useEffect untuk memusatkan ulang peta saat properti center berubah
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

// Antarmuka untuk properti MapComponent
interface MapComponentProps {
  center: [number, number] | null; // Izinkan pusat menjadi null awalnya
  hotels: Hotel[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, hotels }) => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (typeof L !== "undefined") {
      setLeafletLoaded(true);
    } else {
      const checkLeaflet = setInterval(() => {
        if (typeof L !== "undefined") {
          setLeafletLoaded(true);
          clearInterval(checkLeaflet);
        }
      }, 50);

      return () => clearInterval(checkLeaflet);
    }
  }, []);

  const validHotels = hotels || [];

  // Jika Leaflet belum dimuat, tampilkan status loading
  if (!leafletLoaded) {
    return <div>Memuat peta...</div>;
  }

  // Ikon kustom untuk marker
  const customIcon = new L.Icon({
    iconUrl: "/images/marker-icon.png",
    iconRetinaUrl: "/images/marker-icon-2x.png",
    shadowUrl: "/images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={center || [0, 0]} // Pusat awal, default ke [0, 0] jika pusat null
      zoom={13} // Tingkat zoom awal
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <ChangeView center={center} zoom={13} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker untuk Kota (Pusat) */}
      {center && (
        <Marker position={center} icon={customIcon}>
          <Popup>Lokasi Kota</Popup>
        </Marker>
      )}

      {/* Marker untuk Hotel */}
      {validHotels.map(
        (hotel) =>
          typeof hotel.latitude === "number" &&
          typeof hotel.longitude === "number" && (
            <Marker
              key={hotel.id}
              position={[hotel.latitude, hotel.longitude]}
              icon={customIcon} // Gunakan ikon kustom di sini
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p>{hotel.address}</p>
                  <p>Rating: {hotel.rating}</p>
                  <p>Harga: ${hotel.price_per_night}</p>
                </div>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default MapComponent;
