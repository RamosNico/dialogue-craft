import characters from "@/helpers/characters";
import useCohere from "@/services/useCohere";
import { Button } from "flowbite-react";

export default function Home() {
  const { fetchData } = useCohere();

  return (
    <>
      <h1 className="text-gray-200 text-5xl font-bold">
        FINALLY THIS IS FLEXED
      </h1>
      <Button onClick={fetchData}>TRY REQUEST</Button>
    </>
  );
}
