  // app/api/explore/route.ts

  import { createClient } from '@supabase/supabase-js';

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  export async function GET() {
    const { data, error } = await supabase
      .from('special_offers')
      .select('*')
      .order('title');

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
