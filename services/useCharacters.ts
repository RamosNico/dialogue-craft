import { useState, useEffect } from "react";
import Character from "@/models/character";

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

interface AddParams extends Omit<Character, "id"> {}

const useCharacters = () => {
  const [charList, setCharList] = useState<Character[] | []>([]);

  useEffect(() => {
    const characters: Character[] | null = JSON.parse(localStorage.getItem("characters") || "null");
    setCharList(characters || initialList);
  }, []);

  const addChar = ({ name, age, description }: AddParams) => {
    const newChar = {
      id: charList[charList.length - 1]?.id + 1 || 0,
      name: name,
      age: age,
      description: description,
    };

    setCharList((prev) => {
      const newArr = [...prev, newChar];
      localStorage.setItem("characters", JSON.stringify(newArr));
      return newArr;
    });
  };

  const onRemoveChar = (id: Character["id"]) => {
    return setCharList((prev) => {
      const newArr = prev.filter((char) => char.id !== id);
      localStorage.setItem("characters", JSON.stringify(newArr));
      return newArr;
    });
  };

  const resetChars = () => {
    setCharList(initialList);
    localStorage.setItem("characters", JSON.stringify(initialList));
  }

  return { charList, addChar, onRemoveChar, resetChars };
};

export default useCharacters;
