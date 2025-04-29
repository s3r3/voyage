import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";

  try {
    let query = supabase
      .from("offers") // Assuming your table is named "offers" (plural)
      .select("*"); // Select all columns by default

    if (type !== "all") {
      query = query.eq("type", type); // Filter by type if specified
    }

    const { data: offers, error } = await query;

    if (error) throw error;

    return NextResponse.json({ offers }, { status: 200 });
  } catch (error) {
    console.error("Offers API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}
