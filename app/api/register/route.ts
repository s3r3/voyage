import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs"; // <-- tambahkan ini

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Buat user baru di Supabase Auth
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      return NextResponse.json({ error: supabaseError.message }, { status: 400 });
    }

    // Hash password sebelum simpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan data user ke database kamu
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword, // <-- disini sudah aman
      },
    });

    return NextResponse.json({
      message: "User registered. Please check your email to confirm.",
      data: newUser,
    }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
