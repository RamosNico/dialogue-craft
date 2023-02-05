import { FC } from "react";
import { Table } from "flowbite-react";
import Character from "@/models/character";

type TableProps = {
  charList: Character[];
  removeChar: (id: number) => void;
};

const CharactersTable: FC<TableProps> = ({ charList, removeChar }) => {
  return (
    <Table>
      <Table.Head className="text-gray-100">
        <Table.HeadCell className="bg-slate-700">Name</Table.HeadCell>
        <Table.HeadCell className="bg-slate-700">Age</Table.HeadCell>
        <Table.HeadCell className="bg-slate-700 grow">
          Description
        </Table.HeadCell>
        <Table.HeadCell className="bg-slate-700 shrink">Remove</Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y text-gray-100">
        {charList.map((char: Character) => (
          <Table.Row key={char.id} className="border-gray-700">
            <Table.Cell className="whitespace-nowrap font-medium">
              {char.name}
            </Table.Cell>
            <Table.Cell>{char.age}</Table.Cell>
            <Table.Cell>{char.description}</Table.Cell>
            <Table.Cell>
              <svg
                className="w-6 h-6 ml-3 cursor-pointer hover:stroke-red-600 transition-all"
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
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default CharactersTable;