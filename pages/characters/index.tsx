import CharactersTable from "@/components/characters/characters-table";
import useCharactersList from "@/helpers/useCharactersList";
import { Button } from "flowbite-react";

export default function CharactersPage() {
  const { charList, addChar, removeChar } = useCharactersList();

  const newChar = {
    name: "Rodrigo",
    age: 24,
    description: "A man who just came to this world from an outer one and does not remember anything.",
  };

  return (
    <>
      <h1 className="mb-6 text-5xl font-bold">Characters</h1>
      <p className="mb-4">Here's a list with your current characters:</p>

      <CharactersTable charList={charList} removeChar={removeChar} />

      <div className="flex gap-6">
        <Button
          className="mt-8 w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-700 disabled:hover:bg-blue-700 transition-all"
          onClick={() => addChar({ ...newChar })}
        >
          Add new character
        </Button>
      </div>
    </>
  );
}
