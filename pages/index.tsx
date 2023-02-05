import useCohere from "@/services/useCohere";
import { Button, Spinner } from "flowbite-react";

export default function Home() {
  const { data, isLoading, error, fetchData } = useCohere();
  if (error) console.error(error);

  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-5xl font-bold">Get a new dialog</h1>
      <p>Here you will input your characters and description</p>

      <Button
        className="my-8 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
        onClick={fetchData}
        disabled={isLoading}
      >
        {!isLoading && <span className="text-base">Try request</span>}
        {isLoading && (
          <>
            <Spinner color="info" size="md" className="mr-2" />
            <span className="text-base">Loading</span>
          </>
        )}
      </Button>

      {data && (
        <div className="bg-slate-600 p-4 rounded-lg">
          <pre className="max-w-[70ch] whitespace-pre-wrap leading-9">{data}</pre>
        </div>
      )}
    </div>
  );
}
