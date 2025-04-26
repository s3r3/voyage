import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase"; // Supabase client
import prisma from "@/app/lib/prisma"; // Prisma client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Validasi input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Buat pengguna baru di Supabase
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      return NextResponse.json({ error: supabaseError.message }, { status: 400 });
    }

    // Simpan data pengguna baru di database menggunakan Prisma
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          // Jangan lakukan hashing manual jika Supabase sudah menangani password hashing
          password: password,  // Pastikan password tidak di-hash jika Supabase sudah melakukannya
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
