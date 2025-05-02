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
        // Fetch additional user details from the 'User' table in Supabase
        const { data: userData, error } = await supabase
          .from('User')
          .select('FullName')
          .eq('id', user?.id)
          .single();

        if (error) {
          console.error('Error fetching user details:', error);
        } else {
          setUser({ ...user, FullName: userData?.FullName });
        }
      } else {
        setUser(null);
      }
    };

    getSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) {
        supabase.auth.getUser().then(async ({ data: { user } }) => {
          const { data: userData, error } = await supabase
            .from('User')
            .select('FullName')
            .eq('id', user?.id)
            .single();

          if (error) {
            console.error('Error fetching user details:', error);
          } else {
            setUser({ ...user, FullName: userData?.FullName });
          }
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