import { useCallback, useReducer, useRef } from "react";
import { words } from "./wordList";

import { Game } from "./Components/Game";

const urlParams = new URLSearchParams(window.location.search);

function App() {
	const wordIndex = useRef(urlParams.get("word") || undefined);

	const getNewWord = useCallback((index) => {
		if (wordIndex.current !== undefined && index === wordIndex.current) return words[ wordIndex.current ];

		if (index === undefined || isNaN(index)) index = Math.floor(Math.random() * words.length);
		else if (index >= words.length) index = index % words.length;

		const url = new URL(window.location);
		url.searchParams.set("word", index);
		if (wordIndex.current === undefined) window.history.replaceState({}, "", url);
		else window.history.pushState({}, "", url);

		wordIndex.current = index;
		
		return words[ index ];
	}, []);

	const [ word, shuffleWord ] = useReducer(getNewWord, getNewWord(wordIndex.current));
	
  return (
    <Game
			word={word}
			chooseNewWord={shuffleWord}
		/>
  );
}

export default App;
