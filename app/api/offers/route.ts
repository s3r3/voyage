import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Pastikan path sesuai

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";

  try {
    let query = prisma.offer.findMany({
      select: { id: true, title: true, type: true, imageUrl: true },
    });

    if (type !== "all") {
      query = query.where({ type });
    }

    const offers = await query;

    return NextResponse.json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}