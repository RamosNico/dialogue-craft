import CharactersTable from "@/components/characters/characters-table";
import useCharacters from "@/services/useCharacters";
import Character from "@/models/character";
import { Button, Label } from "flowbite-react";
import { useState } from "react";

interface NewChar extends Omit<Character, "id"> {}

export default function CharactersPage() {
  const { charList, addChar, onRemoveChar, resetChars } = useCharacters();
  const [newChar, setNewChar] = useState<NewChar>({
    name: "",
    age: undefined,
    description: "",
  });

  const charPlaceholder = {
    name: "Charlie",
    age: 42,
    description:
      "A man who just came to this world from an outer one and does not remember anything.",
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    addChar({ ...newChar });
  };

  return (
    <>
      <h1 className="mb-4 text-5xl font-bold">Characters</h1>
      <section>
        <p className="mb-4 max-w-[70ch]">
          Below you can find a list with all your available characters. This
          list will be stored in your Local Storage, so you do not need to worry
          if you remove or add some and want to come back later.
        </p>
        <CharactersTable charList={charList} onRemoveChar={onRemoveChar} />
        <p
          className="mt-3 w-fit text-gray-300 text-sm cursor-pointer hover:text-cyan-400 transition-all"
          onClick={resetChars}
        >
          Click here to reset the characters list
        </p>
      </section>

      <section>
        <h2 className="mt-6 mb-3 text-3xl font-bold">Add new character</h2>
        <form onSubmit={(e) => handleForm(e)}>
          <div className="flex justify-between gap-8">
            <div className="mb-5 w-full">
              <Label htmlFor="charName" className="text-gray-100 text-base font-normal">
                Character's name
              </Label>
              <input
                className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                type="text"
                id="charName"
                placeholder={charPlaceholder.name}
                value={newChar?.name}
                onChange={(e) =>
                  setNewChar({ ...newChar, name: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-5 w-full">
              <Label htmlFor="charAge" className="text-gray-100 text-base font-normal">
                Character's age
              </Label>
              <input
                className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                type="text"
                id="charAge"
                placeholder={charPlaceholder.age.toString()}
                value={newChar?.age}
                onChange={(e) => setNewChar({ ...newChar, age: +e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <Label htmlFor="charDesc" className="text-gray-100 text-base font-normal">
            Character's description <span className="text-sm text-gray-300">(It is recommended to start with something like 'a man...')</span>
            </Label>
            <textarea
              className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
              id="charDesc"
              placeholder={charPlaceholder.description}
              value={newChar?.description}
              onChange={(e) => setNewChar({ ...newChar, description: e.target.value })}
              rows={3}
              required
            />
          </div>
          <Button
            className="mt-8 w-full bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
            type="submit"
          >
            <span className="text-base">Add new character</span>
          </Button>
        </form>
      </section>
    </>
  );
}
