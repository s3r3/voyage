import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Validate input fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Sign up user with Supabase Auth and store additional data in metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // If you want to store additional data in a separate table (optional)
    // Uncomment and configure the following lines:
    /*
    const { data: userData, error: insertError } = await supabase
      .from("User") // Ensure this matches your Prisma schema or Supabase table
      .insert({
        id: authData.user?.id,
        email,
        firstName,
        lastName,
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }
    */

    return NextResponse.json(
      {
        message:
          "User registered successfully. Check your email for confirmation.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
