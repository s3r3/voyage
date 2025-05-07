// app/api/types.ts

// Define basic types for related entities if they are part of the Hotel type
export interface Services {
  id: number;
  name: string;
  description: string | null;
}

export interface HotelServices {
  hotel_id: number;
  service_id: number;
  services: Services;
}

export interface HotelImages {
  id: number;
  hotel_id: number;
  image_url: string;
  alt_text: string | null;
}

// Define the main Hotel type based on your database schema and API response structure
export interface Hotel {
  id: number;
  name: string;
  description: string | null;
  address: string;
  city_id: number;
  latitude: number;
  longitude: number;
  rating: number;
  discount_percentage: number;
  price_per_night: number;
  vip_available: boolean;

  // Relations - based on how your API route fetches and structures the data
  hotel_images: HotelImages[];
  hotel_services: HotelServices[];

  // If city data is embedded directly in the hotel object (less likely but possible)
  // city?: {
  //   id: number;
  //   name: string;
  //   // etc.
  // };
}

// You might also want a general type for API responses if they follow a pattern
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Example of using this typing for the API search result structure
// This matches the SearchResultsData interface defined in searchResultPage.tsx
// It's better to define this structure here so it's consistent across the app.
export interface HotelSearchResult {
  hotels: Hotel[];
  city: {
    id: number;
    name: string;
    description: string | null;
    latitude: number;
    longitude: number;
  } | null;
  error?: string;
}
