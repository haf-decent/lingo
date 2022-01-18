import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { CenteredFlex, Flex } from "../Styles/Flex";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { LetterSlot } from "./LetterSlot";

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	padding: 30px;
	& > div {
		margin-bottom: 15px;
	}
`;

const Title = styled(Flex).attrs(() => ({
	align: "center"
}))``;

const createBlankState = (rows, cols) => (
	Array.from({ length: rows }, () => (
		Array.from({ length: cols }, () => "_")
	))
);

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
		if (isMobile && word && window.innerWidth < 130 + word.length * 60) return (window.innerWidth - 130) / word.length;
		return 60;
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

	return (
		<Container>
			<Title>
				{"LINGO".split("").map((c, i) => (
					<LetterSlot
						key={i}
						letter={c}
						size={size}
						invert={true}
					/>
				))}
			</Title>
			<Board
				enabled={enabled}
				size={size}
				gameState={state.rows.map((row, r) => row.map((char, c) => ({
					letter: char,
					status: r < state.move[0]
						? checkStatus(char, c)
						: enabled && r === state.move[0] && (c === state.move[1] || (state.move[1] === row.length && c === state.move[1] - 1))
							? "selected"
							: null
				})))}
				onInput={onInput}
				onEnter={onEnter}
				onBackspace={onBackspace}
			/>
			<Controls
				width={size * word.length + 70}
				enabled={enabled}
				hasWon={hasWon}
				hasLost={hasLost ? word: false}
				onReset={chooseNewWord}
			/>
		</Container>
	)
}