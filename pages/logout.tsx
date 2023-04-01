import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "flowbite-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Logout = () => {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();

  // if (!session) return router.push("/login");

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return console.error(error);
    return router.push("/");
  };

  if (session)
    return (
      <>
        <h1 className="mb-6 text-5xl font-bold">Logout</h1>
        <p className="max-w-[80ch]">
          You are about to logout from your account. You will still be able to
          use the application, but every change you do regarding characters,
          will be stored in your local storage. They will not be safely stored
          in our database. <br />
          Do you wish to proceed?
        </p>
        <Button
          className="mt-8 py-1 px-4 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
          type="submit"
          onClick={() => logout()}
        >
          <span className="text-base">Logout</span>
        </Button>
      </>
    );
};

export default Logout;
