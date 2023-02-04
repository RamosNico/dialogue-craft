import useCharactersList from "@/helpers/useCharactersList";
import { Button } from "flowbite-react";

export default function CharactersPage() {
  const { charList, addChar, removeChar } = useCharactersList();

  const newChar = {
    name: "Rodrigo",
    age: 24,
    description:
      "A man who just came to this world from an outer one and does not remember anything.",
  };

  return (
    <>
      <h1 className="text-5xl font-bold">Characters</h1>
      <p>Here's a list with your current characters:</p>

      <ul>
        {charList.map((char) => (
          <li key={char.id} className="flex gap-2">
            <p>{`${char.name} (ID ${char.id})`}</p>
            <svg
              className="w-6 h-6 cursor-pointer hover:stroke-red-600 transition-all"
              onClick={() => removeChar(char.id)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </li>
        ))}
      </ul>

      <div className="flex gap-6">
        <Button
          className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-700 disabled:hover:bg-blue-700 transition-all"
          onClick={() => addChar({ ...newChar })}
        >
          Add new character
        </Button>
      </div>
    </>
  );
}
