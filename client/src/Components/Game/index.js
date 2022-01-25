import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { CenteredFlex } from "../Styles/Flex";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { Keyboard } from "./Keyboard";

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	padding: 30px;
	padding-bottom: 160px;
	& > div:not(:last-of-type) {
		margin-bottom: 15px;
	}
`;

const createBlankState = (rows, cols) => (
	Array.from({ length: rows }, () => (
		Array.from({ length: cols }, () => "_")
	))
);

const defaultSize = 60;

export function Game({ word, chooseNewWord }) {
	word = word.toLowerCase();

	const [ state, setState ] = useState({
		move: [ 0, 0 ],
		rows: []
	});

	const resetState = useCallback(() => setState({
		move: [ 0, 0 ],
		rows: createBlankState(word.length + 1, word.length)
	}), [ word ]);

	useEffect(resetState, [ resetState ]);

	const checkStatus = useCallback((letter, index) => {
		if (letter === "_") return null;
		if (word.includes(letter)) {
			if (letter === word[ index ]) return "correct";
			return "misplaced";
		}
		return "unused";
	}, [ word ]);

	const hasWon = state.rows.slice(0, state.move[0]).some(letters => letters.join("") === word);
	const hasLost = !hasWon && state.move[0] >= state.rows.length;
	const enabled = !!word && !hasWon && !hasLost;

	const size = useMemo(() => {
		if (isMobile && word && window.innerWidth < 130 + word.length * defaultSize) return defaultSize / 60 * (window.innerWidth - 130) / word.length;
		return defaultSize;
	}, [ word ]);

	const onInput = useCallback(letter => setState(({ move: [ row, col ], rows }) => {
		const [ letterCol, moveCol ] = col === rows[ row ].length
			? [ col - 1, col ]
			: [ col, col + 1 ];
		rows[ row ][ letterCol ] = letter;
		return {
			move: [ row, moveCol ],
			rows
		}
	}), []);

	const onEnter = useCallback(() => setState(s => {
		const { move: [ row, col ], rows } = s;
		if (col < rows[ row ].length) return s;
		return {
			...s,
			move: [ row + 1, 0 ]
		}
	}), []);

	const onBackspace = useCallback(() => setState(({ move: [ row, col ], rows }) => {
		const nCol = Math.max(col - 1, 0);
		rows[ row ][ nCol ] = "_";
		return {
			move: [ row, nCol ],
			rows
		}
	}), []);

	const gameState = useMemo(() => state.rows.map((row, r) => (
		row.map((char, c) => ({
			letter: char,
			status: r < state.move[0]
				? checkStatus(char, c)
				: enabled && r === state.move[0] && (c === state.move[1] || (state.move[1] === row.length && c === state.move[1] - 1))
					? "selected"
					: null
		})
	))), [ state, checkStatus, enabled ]);

	const letterState = useMemo(() => (
		state.rows.reduce((obj, row, r) => {
			if (r < state.move[0]) row.forEach((char, c) => obj[ char ] = checkStatus(char, c));
			return obj
		}, {})
	), [ state, checkStatus ])

	return (
		<Container>
			<Controls
				width={size * word.length + 50}
				enabled={enabled}
				hasWon={hasWon}
				hasLost={hasLost ? word: false}
				onReset={chooseNewWord}
			/>
			<Board
				enabled={enabled}
				size={size}
				gameState={gameState}
				onInput={onInput}
				onEnter={onEnter}
				onBackspace={onBackspace}
			/>
			<Keyboard
				width={size * word.length + 50}
				letterState={letterState}
				onInput={onInput}
				onEnter={onEnter}
				onBackspace={onBackspace}
			/>
		</Container>
	)
}