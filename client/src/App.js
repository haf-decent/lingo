import { useReducer } from "react";
import { words } from "./wordList";

import { Game } from "./Components/Game";

const chooseRandomWord = () => words[ Math.floor(Math.random() * words.length) ];

function App() {
	const [ word, shuffleWord ] = useReducer(chooseRandomWord, chooseRandomWord());
	
  return (
    <Game
			word={word}
			chooseNewWord={shuffleWord}
		/>
  );
}

export default App;
