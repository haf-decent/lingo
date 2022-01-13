import { useState } from "react";
import { words } from "./wordList";

import { Game } from "./Components/Game";

function App() {
	const [ word, setWord ] = useState(words[ Math.floor(Math.random() * words.length) ]);

	const shuffleWord = () => setWord(words[ Math.floor(Math.random() * words.length) ]);
	
  return (
    <Game
			word={word}
			chooseNewWord={shuffleWord}
		/>
  );
}

export default App;
