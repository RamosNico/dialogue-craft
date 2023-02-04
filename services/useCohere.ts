import cohere from "cohere-ai";
import { useState } from "react";

const useCohere = (input: {} = {}) => {
  cohere.init(process.env.cohereKey as string);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const body = {
    model: "command-xlarge-20221108",
    prompt:
      "We have two persons:\n- Nicolas, age 26, an arrogant and romantic man\n- Melisa, age 24, a sensitive and talkative woman\nWrite me a conversation between these two persons for a movie script in the style where they are a couple discussing what they are having for dinner, he calls her honey and she calls him sweetie. Where they end up deciding to eat hot dogs.",
    max_tokens: 416,
    temperature: 1.2,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  };

  const fetchData = async () => {
    setIsLoading(true);
    setData("");
    setError("");
    try {
      const response = await fetch(process.env.cohereGenerateUrl as string, {
        method: "POST",
        headers: {
          Authorization: `BEARER ${process.env.cohereKey}`,
          "Content-Type": "application/json",
          "Cohere-Version": "2022-12-06",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Something went wrong with the API");
      const result = await response.json();

      setIsLoading(false);
      setData(result.generations[0].text.trim());
    } catch (err) {
      setIsLoading(false);
      setError(err as string);
    }
  };

  return { data, error, isLoading, fetchData };
};

export default useCohere;
