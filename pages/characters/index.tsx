import { useSession } from "@supabase/auth-helpers-react";
import SupabaseAuth from "@/components/auth/supabase-auth";
import Characters from "@/components/characters/containers/characters";

export default function Home() {
  const session = useSession();

  return <Characters session={session || "guest"} />
}