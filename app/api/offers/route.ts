// app/api/offers/route.ts

import { NextResponse } from "next/server";
import prisma from "../../lib/prisma"; // Pastikan prisma instance sudah siap

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    let offers;

    // Jika filter type tidak ada atau 'all', ambil semua data
    if (!type || type === "all") {
      offers = await prisma.offer.findMany(); // Gunakan lowercase 'offer'
    } else {
      // Ambil data berdasarkan type
      offers = await prisma.offer.findMany({ // Gunakan lowercase 'offer'
        where: {
          type: type,
        },
      });
    }

    // Kirimkan response dalam format JSON
    return NextResponse.json(offers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    // Tangani error dan kirimkan respons error dengan status 500
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}