import { useState } from "react";

type Character = {
  id: number;
  name: string;
  age: number;
  description: string;
};

const initialList: Character[] = [
  {
    id: 0,
    name: "Julia",
    age: 41,
    description:
      "A woman who works as a lawyer. She is not shy and she talks really rude.",
  },
  {
    id: 1,
    name: "Alfonso",
    age: 43,
    description:
      "A shy man who works as an accountant. He always let other people interrupt him.",
  },
];

const useCharactersList = () => {
  const [charList, setCharList] = useState(initialList || []);

  const addChar = (obj: Character) => {
    return setCharList((prev) => ([ ...prev, obj ]));
  }

  const removeChar = (id: Character["id"]) => {
    return setCharList(charList.filter(char => char.id !== id));
  };

  return { charList, addChar, removeChar };
};

export default useCharactersList;
