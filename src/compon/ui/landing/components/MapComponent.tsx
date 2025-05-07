"use client";

import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import the Hotel type from the shared types file
import { Hotel } from "app/api/types"; 

// Fix for missing marker icons
(L.Icon.Default.prototype as any)._getIconUrl = undefined;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
  iconUrl: "leaflet/images/marker-icon.png",
  shadowUrl: "leaflet/images/marker-shadow.png",
});

// New component to handle map centering when center prop changes
interface ChangeViewProps {
  center: [number, number] | null; // Allow center to be null initially
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMapEvents({});
  // useEffect to recenter/rezoom when center prop changes
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null; // This component doesn't render anything
};

// Interface for MapComponent props
interface MapComponentProps {
  center: [number, number] | null; // Allow center to be null initially
  hotels: Hotel[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, hotels }) => {
  // Ensure hotels is always an array, default to empty array if null/undefined
  const validHotels = hotels || [];

  return (
    <MapContainer
      center={center || [0, 0]} // Initial center, default to [0, 0] if center is null
      zoom={13} // Initial zoom level
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <ChangeView center={center} zoom={13} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker for City (Center) - Optional, display only if center is provided */}
      {center && (
        <Marker position={center}>
          <Popup>
            {/* Add city name or other relevant info here */}
            City Location
          </Popup>
        </Marker>
      )}

      {/* Markers for Hotels */}
      {validHotels.map(
        (hotel) =>
          // Ensure latitude and longitude are valid numbers before creating marker
          typeof hotel.latitude === "number" &&
          typeof hotel.longitude === "number" && (
            <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
              <Popup>
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p>{hotel.address}</p>
                  {/* Add other hotel info if needed */}
                  <p>Rating: {hotel.rating}</p>
                  <p>Price: ${hotel.price_per_night}</p>
                </div>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default MapComponent;
