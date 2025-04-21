import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase"; // Supabase client
import prisma from "@/app/lib/prisma"; // Prisma client
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    console.log("📥 Request body:", body);

    if (!email || !password || !firstName || !lastName) {
      console.error("⚠️ Missing fields");
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      console.error("❌ Supabase signup error:", supabaseError.message);
      return NextResponse.json({ error: supabaseError.message }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    console.log("✅ User created in DB:", newUser);

    return NextResponse.json(
      { message: "User registered. Please check your email to confirm.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Internal server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
