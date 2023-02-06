import useCharacters from "@/services/useCharacters";
import { Button, Spinner, Label } from "flowbite-react";
import { FC, FormEvent, useState } from "react";
import ParticipantSelect from "./participant-select";

interface FormProps {
  isLoading: boolean;
  fetchData: (p: string) => void;
}

const examplePrompt =
  "We have two persons:\n- Nicolas, age 26, an arrogant and romantic man\n- Melisa, age 24, a sensitive and talkative woman\nWrite me a conversation between these two persons for a movie script in the style where they are a couple discussing what they are having for dinner, he calls her honey and she calls him sweetie. Where they end up deciding to eat hot dogs.";

const DialogForm: FC<FormProps> = ({ isLoading, fetchData }) => {
  const { charList } = useCharacters();
  const [charAmount, setCharAmount] = useState(1);
  const [selectedChars, setSelectedChars] = useState({});

  const handleChar = (n: number, id: number) => {
    setSelectedChars(prev => ({...prev, [n]: charList.find((char) => char.id === id)}))
  };

  // Avoid keeping more characters than the amount selected
  const handleCharAmount = (amount: number) => {
    const oldArr = Object.entries(selectedChars);
    const filtered = oldArr.filter(([key, value]) => amount >= +key);
    setCharAmount(amount);
    setSelectedChars(Object.fromEntries(filtered));
  }

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    fetchData(examplePrompt)
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
        <div className="mt-4 gap-y-4 grid xl:grid-cols-4 md:grid-cols-3">
          {[...Array(charAmount)].map((_, i) => (
            <ParticipantSelect key={i + 1} n={i + 1} charList={charList} charHandler={handleChar} />
          ))}
        </div>
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
