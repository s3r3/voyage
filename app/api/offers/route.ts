// app/api/offers/route.ts

import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";

  try {
    let offers;

    if (type === "all") {
      offers = await prisma.offer.findMany({
        where: {
          status: "ACTIVE",
          AND: {
            type: {
              in: ["hotel", "flight", "multi"],
            },
          },
        },
      });
    } else {
      offers = await prisma.offer.findMany({
        where: {
          status: "ACTIVE",
          type: type as any,
        },
      });
    }

    return NextResponse.json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}