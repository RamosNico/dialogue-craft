type Character = {
  name: string;
  age: number;
  description: string;
};

interface CharacterList {
  [P: string]: Character;
}

const characters: CharacterList = {
  julia: {
    name: "Julia",
    age: 41,
    description: "A woman who works as a lawyer. She is not shy and she talks really rude.",
  },
  alfonso: {
    name: "Alfonso",
    age: 43,
    description: "A shy man who works as an accountant. He always let other people interrupt him."
  }
};

export default characters;
