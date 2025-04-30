import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  try {
    let query = supabase.from("offers").select("*");

    if (type !== "all") {
      query = query.eq("type", type);
    }

    const { data: offers, error } = await query;

    if (error) throw error;

    return NextResponse.json({ offers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
