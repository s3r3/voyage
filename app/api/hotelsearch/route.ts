import { supabase } from "app/lib/supabase"; // Sesuaikan path import Supabase client Anda
import { NextResponse } from 'next/server';

// Ini adalah handler untuk HTTP GET requests ke /api/hotelsearch
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const checkInDateStr = searchParams.get('checkIn');
  const checkOutDateStr = searchParams.get('checkOut');
  const guestsStr = searchParams.get('guests');
  const roomsStr = searchParams.get('rooms');
  const vipStr = searchParams.get('vip');

  // Lakukan validasi dasar untuk parameter yang dibutuhkan
  if (!location) {
    return NextResponse.json({ error: 'Location parameter is required' }, { status: 400 });
  }

  // Parse parameter ke tipe data yang benar
  const checkInDate = checkInDateStr ? new Date(checkInDateStr) : null;
  const checkOutDate = checkOutDateStr ? new Date(checkOutDateStr) : null;
  const guests = guestsStr ? parseInt(guestsStr, 10) : null;
  const rooms = roomsStr ? parseInt(roomsStr, 10) : null;
  const vip = vipStr === 'true';

  try {
    // Ambil data kota berdasarkan lokasi
    const { data: city, error: cityError } = await supabase
      .from('cities')
      .select('id, name, description, latitude, longitude')
      .eq('name', location)
      .single();

    if (cityError || !city) {
      console.error('Error fetching city:', cityError);
      // Kembalikan response 404 jika kota tidak ditemukan
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Ambil data hotel berdasarkan city_id dan filter lainnya
    const { data: hotels, error: hotelsError } = await supabase
      .from('hotels')
      .select(`
        id,
        name,
        description,
        address,
        latitude,
        longitude,
        rating,
        price_per_night,
        discount_percentage,
        vip_available,
        hotel_images ( image_url ),
        hotel_services ( services ( name ) )
      `)
      .eq('city_id', city.id);

    if (hotelsError) {
      console.error('Error fetching hotels:', hotelsError);
      // Kembalikan response error 500 jika ada masalah dengan query hotel
      return NextResponse.json({ error: hotelsError.message }, { status: 500 });
    }

    // --- Implementasi Logika Filter Tambahan Berdasarkan Tanggal, Tamu, Kamar ---
    // Lakukan filtering di sini jika tidak ditangani sepenuhnya oleh query Supabase
    const filteredHotels = hotels.filter(hotel => {
        // Contoh: Filter berdasarkan ketersediaan VIP
        if (vip && !hotel.vip_available) {
            return false; // Abaikan hotel jika VIP diminta tapi tidak tersedia
        }
        // --- Tambahkan logika filter tamu, kamar, tanggal di sini ---
        // Untuk filter tanggal dan ketersediaan kamar, Anda mungkin perlu tabel tambahan
        // atau logic yang lebih kompleks
        return true;
    });
    // -----------------------------------------------------------------------------

    // Kembalikan data hotel dan kota yang difilter sebagai response JSON
    return NextResponse.json({ hotels: filteredHotels, city: city });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    // Kembalikan response error internal server error
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// Anda bisa menambahkan handler lain seperti POST, PUT, DELETE jika diperlukan,
// tetapi untuk pencarian GET sudah cukup.
// export async function POST(request: Request) { ... }