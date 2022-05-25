# L I N G O

Lingo is a React project inspired by the popular word game [Wordle](https://www.nytimes.com/games/wordle/index.html) (which, for the record, is heavily _inspired_ by the game show, [Lingo](https://en.wikipedia.org/wiki/Lingo_(American_game_show)), for which this repo has been named).

You can find a [live demo here](https://lingo-game.netlify.app).

## How it Works
This version of the game stays fairly true to the original:
* A 5-letter word is chosen at random from a prepared list
* The player has up to 6 attempts to guess the word. Guesses can be entered in using either the keyboard UI or the computer's physical keyboard.
* After each guess is submitted, the letters of that guess are highlighted. A letter will be highlighted green if the letter is in the correct place, yellow if the letter is used somewhere else in the word, or gray if the letter is not used at all.

## Other features
* Using the RESET button, players can keep guessing new random words as many times as they like - no 24hr wait limit
* A timer adds an additional competitive element to each game
* The url updates with each new word so that players can quickly share the same puzzle they just solved with friends

## Tech Stack
- [React ⚛️](https://github.com/facebook/react)
- [Styled Components 💅](https://github.com/styled-components/styled-components)
- [Netlify 🔷](https://www.netlify.com/)
