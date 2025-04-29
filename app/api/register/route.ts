import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase"; // Ensure this path is correct

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Validate input fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Insert additional user data into the `users` table
    const { error: dbError } = await supabase
      .from("users")
      .insert({
        id: authData.user?.id, // Use the user ID from Supabase Auth
        email,
        firstName, // Use camelCase if your Supabase table columns match
        lastName,  // Use camelCase if your Supabase table columns match
      });

    if (dbError) {
      // Rollback: Delete the user from auth if database insertion fails
      if (authData.user?.id) {
        await supabase.auth.admin.deleteUser(authData.user.id);
      }
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "User registered successfully. Please check your email to confirm.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}