// app/api/offers/route.ts

import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all"; // Menggunakan default value "all" jika type tidak diberikan

  try {
    let offers;

    // Jika type adalah "all", ambil semua data offer
    if (type === "all") {
      offers = await prisma.offer.findMany({
        where: {
          status: 'ACTIVE', // Add this condition
        }
      });
    } else {
      // Jika type tertentu diberikan, ambil data offer berdasarkan type
      offers = await prisma.offer.findMany({
        where: {
          type: type,
          status: 'ACTIVE' // Add this condition
        }
      });
    }

    // Kirimkan response dalam format JSON
    return NextResponse.json(offers);
  } catch (error) {
    // Tangani error dan kirimkan respons error dengan status 500
    console.error("Error fetching offers:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}