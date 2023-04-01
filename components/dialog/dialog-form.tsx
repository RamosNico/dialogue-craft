import useCharacters from "@/services/useCharacters";
import { Button, Spinner, Label } from "flowbite-react";
import { FC, FormEvent, useState } from "react";
import ParticipantSelect from "./participant-select";
import Character from "@/models/character";
import { Session } from "@supabase/supabase-js";

interface FormProps {
  session: Session | "guest";
  isLoading: boolean;
  fetchData: (p: string) => void;
}

const DialogForm = (props: FormProps) => {
  const { session, isLoading, fetchData } = props;
  const { charList } = useCharacters(session);
  const [charAmount, setCharAmount] = useState(1);
  const [selectedChars, setSelectedChars] = useState({});
  const [dialogDesc, setDialogDesc] = useState("");

  const handleChar = (n: number, id: number) => {
    setSelectedChars((prev) => ({
      ...prev,
      [n]: charList.find((char) => char.id === id),
    }));
  };

  // Avoid keeping more characters than the amount selected
  const handleCharAmount = (amount: number) => {
    const oldArr = Object.entries(selectedChars);
    const filtered = oldArr.filter(([key, value]) => amount >= +key);
    setCharAmount(amount);
    setSelectedChars(Object.fromEntries(filtered));
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();

    let charStr = "";
    for (const char of Object.values(selectedChars) as Character[]) {
      charStr = charStr.concat(
        `- ${char.name}, age ${char.age}, ${char.description}\n`
      );
    }

    const prompt = `We have ${charAmount} persons:\n${charStr}Write me a conversation between these ${charAmount} persons for a movie script where ${dialogDesc}`;
    fetchData(prompt);
  };

  return (
    <form className="mt-4" onSubmit={(e) => handleForm(e)}>
      <div>
        <Label className="text-gray-100 text-base font-normal">
          Choose the amount of characters involved
        </Label>

        <select
          className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          name="charAmount"
          id="charAmount"
          onChange={(e) => handleCharAmount(+e.target.value)}
        >
          {[...Array(charList.length)].map((_, i) => (
            <option key={`option-${i}`} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 gap-y-4 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {[...Array(charAmount)].map((_, i) => (
          <ParticipantSelect
            key={i + 1}
            n={i + 1}
            charList={charList}
            charHandler={handleChar}
          />
        ))}
      </div>

      <div className="mt-4">
        <Label className="text-gray-100 text-base font-normal">
          Enter the dialogue description
        </Label>
        <textarea
          className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          value={dialogDesc}
          onChange={(e) => setDialogDesc(e.target.value)}
          name="dialogDesc"
          id="dialogDesc"
          placeholder="They are arguing because Julia and David are married, but David is having an romantic adventure with Alfonso, while there is a hurricane happening outside."
          rows={5}
          required
        ></textarea>
      </div>

      <Button
        className="mt-8 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
        type="submit"
        disabled={isLoading}
      >
        {!isLoading && <span className="text-base">Generate dialog</span>}
        {isLoading && (
          <>
            <Spinner color="info" size="md" className="mr-2" />
            <span className="text-base">Smartly hard-thinking</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default DialogForm;
