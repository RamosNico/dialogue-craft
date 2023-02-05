import { Button, Spinner } from "flowbite-react";
import { FC } from "react";

interface FormProps {
  isLoading: boolean;
  fetchData: (p: string) => void;
}

const examplePrompt =
  "We have two persons:\n- Nicolas, age 26, an arrogant and romantic man\n- Melisa, age 24, a sensitive and talkative woman\nWrite me a conversation between these two persons for a movie script in the style where they are a couple discussing what they are having for dinner, he calls her honey and she calls him sweetie. Where they end up deciding to eat hot dogs.";

const DialogForm: FC<FormProps> = ({ isLoading, fetchData }) => {
  return (
    <Button
      className="mt-8 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-700 disabled:hover:bg-cyan-700 transition-all"
      onClick={() => fetchData(examplePrompt)}
      disabled={isLoading}
    >
      {!isLoading && <span className="text-base">Generating dialog</span>}
      {isLoading && (
        <>
          <Spinner color="info" size="md" className="mr-2" />
          <span className="text-base">Smartly hard-thinking</span>
        </>
      )}
    </Button>
  );
};

export default DialogForm;
