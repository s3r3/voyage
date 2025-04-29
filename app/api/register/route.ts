import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // Validasi input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Registrasi pengguna dengan Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Simpan data tambahan ke tabel `User` di database
    const { error: insertError } = await supabase
      .from("User")
      .insert({
        id: authData.user?.id, // Gunakan ID dari Supabase Auth
        email,
        firstname: firstName, // Sesuaikan dengan nama kolom di Supabase
        lastname: lastName,   // Sesuaikan dengan nama kolom di Supabase
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Registrasi berhasil. Silakan cek email untuk konfirmasi." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registrasi:", error);
    return NextResponse.json(
      { error: "Gagal mendaftar pengguna" },
      { status: 500 }
    );
  }
}