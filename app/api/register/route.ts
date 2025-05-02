import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { FullName, email, password } = await request.json();

    // Validate input
    if (!email || !password || !FullName) {
      return NextResponse.json(
        { error: "Email, password, and FullName are required" },
        { status: 400 }
      );
    }

    // Step 1: Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    // Menggunakan ID yang baru dibuat untuk foreign key
    const { error: insertError } = await supabase
      .from("User")
      .insert([{ id: authData.user?.id, email, FullName }]);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json(
      { message: "User registered successfully", user: authData.user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error); // tetap log di server
    return NextResponse.json(
      {
        error: "Registration failed",
        detail: error?.message || JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
