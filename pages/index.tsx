import useCharactersList from "@/helpers/useCharactersList";
import useCohere from "@/services/useCohere";
import { Button, Spinner } from "flowbite-react";

export default function Home() {
  const { charList } = useCharactersList();
  const { data, isLoading, error, fetchData } = useCohere();
  if (error) console.error(error);

  const formatDialog = (names: string[], data: string) => {
    let newStr = data;
    names.forEach((name) => {
      newStr = newStr.replaceAll(name.toUpperCase(), `${name.toUpperCase()}`);
    });
    return newStr;
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-5xl font-bold">Get a new dialog</h1>
      <p>Here you will input your characters and description</p>

      <Button
        className="mt-8 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
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

      {/* {data && <p>{formatDialog(["NICOLAS", "MELISSA"], data)}</p>} */}
      {data && (
        <pre className="max-w-[70ch] whitespace-pre-wrap leading-9">{data}</pre>
      )}
    </div>
  );
}
