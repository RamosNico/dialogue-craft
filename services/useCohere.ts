import { useState } from "react";
import axios from "axios";

const useCohere = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (prompt: string) => {
    const body = {
      model: "command-xlarge-20221108",
      prompt: prompt,
      max_tokens: 416,
      temperature: 1.1,
      k: 0,
      p: 0.6,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    };

    setIsLoading(true);
    setData("");
    setError("");
    axios.post(process.env.NEXT_PUBLIC_COHERE_GENERATE_URL as string, body, {
      headers: {
        Authorization: `BEARER ${process.env.NEXT_PUBLIC_COHERE_KEY}`,
        "Content-Type": "application/json",
        "Cohere-Version": "2022-12-06",
      },
    })
    .then((response) => {
      setIsLoading(false);
      setData(response.data.generations[0].text.trim());
    })
    .catch(error => {
      setIsLoading(false);
      setError(error);
    });
  };

  return { data, error, isLoading, fetchData };
};

export default useCohere;
