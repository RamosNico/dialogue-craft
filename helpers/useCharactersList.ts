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

  type AddParams = { name: string; age: number; description: string };
  const addChar = ({ name, age, description }: AddParams) => {
    const newChar = {
      id: charList[charList.length - 1]?.id + 1 || 0,
      name: name,
      age: age,
      description: description,
    };
    return setCharList((prev) => [...prev, newChar]);
  };

  const removeChar = (id: Character["id"]) => {
    return setCharList(charList.filter((char) => char.id !== id));
  };

  return { charList, addChar, removeChar };
};

export default useCharactersList;
