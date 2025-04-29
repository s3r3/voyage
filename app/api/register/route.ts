import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Validate input fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Hash password (optional, as Supabase already handles this for auth)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the `users` table in Supabase
    const { data: userData, error: insertError } = await supabase
      .from("users") // Assuming your table name is "users"
      .insert({
        id: authData.user?.id, // Use the user ID from Supabase Auth
        email,
        firstName,
        lastName,
        // password: hashedPassword, // Not needed if Supabase handles auth
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({
      message: "User registered. Please check your email to confirm.",
      data: userData,
    }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}