import CharactersTable from "@/components/characters/characters-table";
import useCharactersList from "@/helpers/useCharactersList";
import Character from "@/models/character";
import { Button, Label } from "flowbite-react";
import { useState } from "react";

interface NewChar extends Omit<Character, "id"> {};

export default function CharactersPage() {
  const { charList, addChar, removeChar } = useCharactersList();
  const [newChar, setNewChar] = useState<NewChar>({
    name: "",
    age: undefined,
    description: "",
  });

  const charPlaceholder = {
    name: "Rodrigo",
    age: 24,
    description:
      "A man who just came to this world from an outer one and does not remember anything.",
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    addChar({...newChar});
  };

  return (
    <>
      <h1 className="mb-6 text-5xl font-bold">Characters</h1>
      <p className="mb-4">Here's a list with your current characters:</p>

      <CharactersTable charList={charList} removeChar={removeChar} />

      <h2 className="mt-6 mb-3 text-3xl font-bold">Add new character</h2>
      <form onSubmit={(e) => handleForm(e)}>
        <div className="flex justify-between gap-8">
          <div className="mb-5 w-full">
            <Label className="text-gray-100 text-base font-normal">
              Character's name
            </Label>
            <input
              className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              id="charName"
              placeholder={charPlaceholder.name}
              value={newChar?.name}
              onChange={(e) => setNewChar({...newChar, name: e.target.value})}
              required
            />
          </div>

          <div className="mb-5 w-full">
            <Label className="text-gray-100 text-base font-normal">
              Character's age
            </Label>
            <input
              className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              id="charAge"
              placeholder={charPlaceholder.age.toString()}
              value={newChar?.age}
              onChange={(e) => setNewChar({...newChar, age: +e.target.value})}
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <Label className="text-gray-100 text-base font-normal">
            Character's description
          </Label>
          <textarea
            className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="charDesc"
            placeholder={charPlaceholder.description}
            value={newChar?.description}
            onChange={(e) => setNewChar({...newChar, description: e.target.value})}
            rows={3}
            required
          />
        </div>
        <Button
          className="mt-8 w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-700 disabled:hover:bg-blue-700 transition-all"
          type="submit"
        >
          Add new character
        </Button>
      </form>
    </>
  );
}
