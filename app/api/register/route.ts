import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase"; // Supabase client
import prisma from "@/app/lib/prisma"; // Prisma client
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create a new user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database using Prisma
    try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

      return NextResponse.json({
        message: "User registered. Please check your email to confirm.",
        data: newUser,
      }, { status: 200 });
  } catch (error) {
      console.error("Database registration error:", error);

      return NextResponse.json({
        error: error instanceof Error ? error.message : "Database error",
      }, { status: 500 });
  }
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
}
}
