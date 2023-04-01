import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import SupabaseAuth from "@/components/auth/supabase-auth";

const Login = () => {
  const router = useRouter();
  const session = useSession()
  
  if (session)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-4xl">You are successfully logged in!</p>
      </div>
    );

  if (!session) return <SupabaseAuth />;
};

export default Login;
