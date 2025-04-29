import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Supabase table (assuming table name is 'users')
    const { data: userData, error: insertError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: hashedPassword, // Store hashed password
        first_name: firstName,
        last_name: lastName,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // Return success response (without sensitive data)
    return NextResponse.json({
      message: "Registration successful",
      user: {
        id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Registration failed" },
      { status: (error as any).status || 500 }
    );
  }
}