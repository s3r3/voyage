import { supabase } from './supabase';
import { useState, useEffect } from 'react';

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSessionAndUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      }
    };

    getSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          setUser(user);
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { session, user };
}
export async function logout() {
  await supabase.auth.signOut();
}