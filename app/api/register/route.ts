import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Input validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows found
      throw checkError;
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 } // Conflict
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from("User")
      .insert({
        email,
        password_hash: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      })
      .select("id, email, firstName, lastName")
      .single();

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: (error as any).message || "Registration failed",
        code: (error as any).code,
      },
      { status: (error as any).status || 500 }
    );
  }
}
