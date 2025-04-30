import { NextResponse } from 'next/server';
import prisma  from '@/app/lib/prisma'; // Sesuaikan path dengan struktur project

// GET /api/offers
export async function GET() {
  try {
    const offers = await prisma.Offer.findMany();
    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}