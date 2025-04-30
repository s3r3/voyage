import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";

  try {
    let query = supabase.from("Offer").select("*");

    // Filter by type if not "all"
    if (type !== "all") {
      query = query.eq("type", type);
    }

    const { data: offers, error } = await query;
    console.log("DATA", offers);
    console.log("ERROR", error);

    if (error) {
      throw error;
    }

    return NextResponse.json({ offers }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch offers" },
      { status: error.status || 500 }
    );
  }
}
