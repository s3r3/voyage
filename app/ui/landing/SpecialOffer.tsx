"use client";

import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOffers(filter: string) {
    try {
      const response = await fetch(`/api/offers?type=${filter}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOffers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch offers");
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchOffers(filter);
  }, [filter]);

  // ... (bagian UI tetap sama)
}