// app/api/offers/route.ts

import { NextResponse } from "next/server";
import prisma from "../../lib/prisma"; // Make sure prisma instance is ready

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    let offers;

    // If filter type doesn't exist or 'all', grab all data
    if (!type || type === "all") {
      offers = await prisma.Offer.findMany(); // Use capital "O" here
    } else {
      // Grab data based on type
      offers = await prisma.Offer.findMany({ // Use capital "O" here
        where: {
          type: type,
        },
      });
    }

    // Send response in JSON format
    return NextResponse.json(offers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    // Handle error and send error response with status 500
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}