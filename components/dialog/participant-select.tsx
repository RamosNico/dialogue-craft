import { FC } from "react";
import { Label } from "flowbite-react";
import Character from "@/models/character";

interface IProps {
  n: number,
  charList: Character[],
  charHandler: (n: number, id: number) => void,
  selectedChars: object
};

const ParticipantSelect: FC<IProps> = ({ n, charList, charHandler, selectedChars }) => {
  return (
    <div key={`character-${n}`}>
      <Label className="text-gray-100 text-base font-normal">
        Character {n}
      </Label>
      <select
        className="mt-1 bg-gray-700 border placeholder-gray-400 text-gray-100 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
        name={`charSelect-${n}`}
        id={`charSelect-${n}`}
        onChange={(e) => charHandler(n, +e.target.value)}
      >
        <option disabled selected>Select a character</option>
        {charList.map((char) => (
          <option key={`char-${char.id}`} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParticipantSelect;
