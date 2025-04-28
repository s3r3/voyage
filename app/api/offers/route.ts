import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase"; // Pastikan path sesuai

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";

  try {
    let query = supabase.from("Offer").select("id, title, type, imageUrl"); // Sesuaikan kolom

    if (type !== "all") {
      query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}