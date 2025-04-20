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
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    // Encrypt password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database menggunakan Prisma
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
         // Relasi dengan Supabase user ID
      },
    });

    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
