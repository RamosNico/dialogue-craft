import cohere from "cohere-ai";
import { useState } from "react";
import axios from "axios";

const useCohere = () => {
  cohere.init(process.env.cohereKey as string);
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
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    };

    setIsLoading(true);
    setData("");
    setError("");
    axios.post(process.env.cohereGenerateUrl as string, body, {
      headers: {
        Authorization: `BEARER ${process.env.cohereKey}`,
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
