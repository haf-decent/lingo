import { useCallback } from "react";
import styled from "styled-components";

import { useEventListener } from "../../Hooks/useEventListener";

import { CenteredFlex, Flex } from "../Styles/Flex";

import { LetterSlot } from "./LetterSlot";

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	position: relative;
	padding: 10px;
	border-radius: 10px;
	box-shadow: inset 0px 3px 11px rgba(0,0,0,0.25);
	@media (prefers-color-scheme: dark) {
		box-shadow: inset 0px 5px 20px rgba(0,0,0,0.8);
	}
`;

const RowContainer = styled(Flex).attrs(() => ({
	align: "center"
}))`
	&:not(:first-of-type) {
		border-top: 2px solid rgba(0,0,0,0.05);
	}
`;

const allowed = "abcdefghijklmnopqrstuvwxyz".split("");

export function Board({ enabled, gameState, onInput, onBackspace, onEnter, size }) {

	const onKeyDown = useCallback(({ key }) => {
		key = key.toLowerCase();
		switch(key) {
			case "backspace":
				return onBackspace();
			case "enter":
				return onEnter();
			default:
				if (allowed.includes(key)) onInput(key);
		}
	}, [ onInput, onBackspace, onEnter ]);
	useEventListener({
		event: "keydown",
		callback: onKeyDown,
		enabled
	});
	
	return (
		<Container>
			{gameState.map((row, i) => (
				<RowContainer key={i}>
					{row.map(({ letter, status }, r) => (
						<LetterSlot
							key={r}
							letter={letter}
							status={!enabled && status === "selected" ? null: status}
							size={size}
						/>
					))}
				</RowContainer>
			))}
		</Container>
	)
}