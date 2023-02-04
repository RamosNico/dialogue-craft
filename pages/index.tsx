import useCharactersList from "@/helpers/useCharactersList";
import useCohere from "@/services/useCohere";
import { Button, Spinner } from "flowbite-react";

export default function Home() {
  const { charList, addChar, removeChar } = useCharactersList();
  const { data, isLoading, error, fetchData } = useCohere();
  if (error) console.error(error);

  const formatDialog = (names: string[], data: string) => {
    let newStr = data;
    names.forEach((name) => {
      newStr = newStr.replaceAll(name.toUpperCase(), `${name.toUpperCase()}`);
    });
    return newStr;
  };

  const newChar = {
    name: "Rodrigo",
    age: 24,
    description: "A man who just came to this world from an outer one and does not remember anything."
  };

  return (
    <>
      <h1 className="text-5xl font-bold">Get a new dialog</h1>
      <p>Here you will input your characters and description</p>
      <p>Here's a list with your current characters:</p>
      <ul>
        {charList.map((char) => (
          <li>{`${char.name} (ID ${char.id})`}</li>
        ))}
      </ul>

      <div className="flex gap-6">
        <Button
          className="w-full bg-red-700 hover:bg-red-600 disabled:bg-red-700 disabled:hover:bg-red-700 transition-all"
          onClick={() => removeChar(0)}
        >
          Remove Julia
        </Button>
        <Button
          className="w-full bg-red-700 hover:bg-red-600 disabled:bg-red-700 disabled:hover:bg-red-700 transition-all"
          onClick={() => removeChar(1)}
        >
          Remove Alfonso
        </Button>
        <Button
          className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-700 disabled:hover:bg-blue-700 transition-all"
          onClick={() => addChar({id: charList[charList.length - 1].id + 1, ...newChar})}
        >
          Add new character
        </Button>
      </div>

      <Button
        className="bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
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
    </>
  );
}
