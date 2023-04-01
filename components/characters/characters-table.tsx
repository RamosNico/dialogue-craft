import { Table } from "flowbite-react";
import Character from "@/models/character";

interface TableProps {
  charList: Character[];
  onRemoveChar: (id: number) => void;
};

const CharactersTable = (props: TableProps) => {
  const { charList, onRemoveChar } = props;
  return (
    <Table>
      <Table.Head className="text-gray-100">
        <Table.HeadCell className="bg-slate-700 w-2/12">Name</Table.HeadCell>
        <Table.HeadCell className="bg-slate-700 w-1/12">Age</Table.HeadCell>
        <Table.HeadCell className="bg-slate-700 w-8/12">
          Description
        </Table.HeadCell>
        <Table.HeadCell className="bg-slate-700 w-1/12">Remove</Table.HeadCell>
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
                onClick={() => onRemoveChar(char.id as number)}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
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
