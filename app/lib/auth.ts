import { supabase } from './supabase';
import { useState, useEffect } from 'react';

// Hook untuk mengelola session
export function useSession() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Mengambil session yang sudah ada saat aplikasi dimulai
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    // Remove the undefined 'currentSession' line as it is unnecessary

    // Menangani perubahan status autentikasi
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session); // Update session jika terjadi perubahan
    });

    return () => {
      authListener?.subscription.unsubscribe(); // Membersihkan listener jika komponen di-unmount
    };
  }, []);

  return session;
}
