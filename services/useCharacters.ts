import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import Character from "@/models/character";
import type { Database } from "@/types/supabase";
type Characters = Database["public"]["Tables"]["characters"]["Row"];

const defaultCharacters: Character[] = [
  {
    name: "Julia",
    age: 41,
    description:
      "A woman who works as a lawyer. She is not shy and she talks really rude.",
  },
  {
    name: "Alfonso",
    age: 43,
    description:
      "A shy man who works as an accountant. He always let other people interrupt him.",
  },
];

const defaultGuestCharacters: Character[] = [
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

const useCharacters = (session: Session | "guest") => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [charList, setCharList] = useState<Character[] | []>([]);

  useEffect(() => {
    if (session !== "guest") getSupabaseCharacters();
    if (session === "guest") {
      const characters: Character[] | null = JSON.parse(
        localStorage.getItem("characters") || "null"
      );
      setCharList(characters || defaultGuestCharacters);
    }
  }, []);

  const getSupabaseCharacters = async () => {
    try {
      setIsLoading(true);
      if (!user) throw new Error("No user");

      const { data, error, status } = await supabase
        .from("characters")
        .select("id, name, age, description");

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCharList(data as Character[] | []);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addChar = async ({ name, age, description }: Character) => {
    if (session !== "guest") {
      try {
        if (!user) throw new Error("No user");
        const newChar = {
          name: name,
          age: age,
          description: description,
          user_id: user.id,
        };
        const { error } = await supabase.from("characters").insert(newChar);
        if (error) throw new Error(error.message);
      } catch (error) {
        console.error(error);
      } finally {
        getSupabaseCharacters();
      }
    }

    if (session === "guest") {
      try {
        const lastId = charList[charList.length - 1]?.id;
        const newChar = {
          id: lastId ? lastId + 1 : 0,
          name: name,
          age: age,
          description: description,
        };

        setCharList((prev) => {
          const newArr = [...prev, newChar];
          localStorage.setItem("characters", JSON.stringify(newArr));
          return newArr;
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onRemoveChar = async (id: Character["id"]) => {
    if (session !== "guest") {
      const { error, status } = await supabase
        .from("characters")
        .delete()
        .eq("id", id);
      if (error) console.error(error);

      if (status) {
        getSupabaseCharacters();
      }
    }

    if (session === "guest") {
      return setCharList((prev) => {
        const newArr = prev.filter((char) => char.id !== id);
        localStorage.setItem("characters", JSON.stringify(newArr));
        return newArr;
      });
    }
  };

  const resetChars = async () => {
    if(session !== "guest") {
      try {
        if (!user) throw new Error("No user");
        const { error } = await supabase.from("characters").insert(
          defaultCharacters.map((char) => ({
            name: char.name,
            age: char.age,
            description: char.description,
            user_id: user.id,
          }))
        );
        if (error) throw new Error(error.message);
      } catch (error) {
        console.error(error);
      } finally {
        getSupabaseCharacters();
      }
    }

    if(session === "guest") {
      setCharList(defaultGuestCharacters);
      localStorage.setItem("characters", JSON.stringify(defaultGuestCharacters));
    }
  };

  return { charList, addChar, onRemoveChar, resetChars };
};

export default useCharacters;
