import Hero from "@/components/Hero";
import { Database } from "@/lib/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main>
      <Hero isLoggedIn={!!session} />
    </main>
  );
}
