import { useSession } from "@supabase/auth-helpers-react";
import DialogForm from "@/components/dialog/dialog-form";
import useCohere from "@/services/useCohere";
import Link from "next/link";
import { Alert } from "flowbite-react";

export default function Home() {
  const session = useSession();
  const { data, isLoading, error, fetchData } = useCohere();

  return (
    <div className="flex flex-col">
      {!session && <Alert className="mb-4" color="info">
        <span>
          <span className="font-medium">You are not logged in!</span> Keep in mind that your character changes will not be saved in the cloud. Instead they will be saved in your browser's local storage.
        </span>
      </Alert>}

      <h1 className="mb-6 text-5xl font-bold">Dialogue Craft</h1>
      <p className="max-w-[80ch]">
        Here you can set everything up to tell the AI how you want your new
        dialogue. <br />
        First of all I suggest going to the{" "}
        <Link
          className="text-cyan-500 hover:text-cyan-600 transition-all"
          href="/characters"
        >
          Characters page
        </Link>
        , where you can see a list with all your available characters and add
        new ones. <br />
        Below you will find a form with all the needed information. We recommend
        playing with the description, being as detailed as possible, the best
        results are achieved by trial and error.
      </p>

      <DialogForm
        session={session || "guest"}
        isLoading={isLoading}
        fetchData={(p: string) => fetchData(p)}
      />

      {data && (
        <section className="mt-8 bg-slate-700 p-4 rounded-lg">
          <pre className="max-w-[70ch] whitespace-pre-wrap leading-9">
            {data}
          </pre>
        </section>
      )}

      {error && (
        <section className="my-8 gap-1 flex flex-col justify-center items-center">
          <p className="text-3xl text-center">
            We are sorry, something went wrong. <br /> Please try again
          </p>
        </section>
      )}
    </div>
  );
}
