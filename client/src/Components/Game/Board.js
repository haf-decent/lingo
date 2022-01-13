import { useEffect, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { CenteredFlex, Flex } from "../Styles/Flex";

import { LetterSlot } from "./LetterSlot";

const RowContainer = styled(Flex).attrs(() => ({
	align: "center"
}))`
	&:not(:first-of-type) {
		border-top: 2px solid rgba(0,0,0,0.05);
	}
`;

function BoardRow({ content = [] }) {
	return (
		<RowContainer>
			{content.map(({ letter, status }, i) => (
				<LetterSlot
					key={i}
					letter={letter}
					status={status}
				/>
			))}
		</RowContainer>
	)
}

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	padding: 10px;
	border-radius: 10px;
	box-shadow: inset 0px 3px 11px rgba(0,0,0,0.3);
`;

const HiddenInput = styled.input`
	display: none;
`;

const allowed = "abcdefghijklmnopqrstuvwxyz".split("");
export function Board({ enabled, gameState, onInput, onBackspace, onEnter }) {
	const [ inputEl, setInputEl ] = useState();

	useEffect(() => {
		if (!enabled) return;

		const onKeyDown = ({ key }) => {
			switch(key) {
				case "Backspace":
					return onBackspace();
				case "Enter":
					return onEnter();
				default:
					allowed.includes(key.toLowerCase()) && onInput(key);
			}
		}
		if (!inputEl) {
			window.addEventListener("keydown", onKeyDown);
			return () => window.removeEventListener("keydown", onKeyDown);
		}
		inputEl.addEventListener("input", e => console.log(e));
	}, [ inputEl, onInput, onBackspace, onEnter, enabled ]);
	
	return (
		<Container onClick={() => inputEl && inputEl.click()}>
			{gameState.map((row, i) => (
				<BoardRow key={i} content={row} />
			))}
			{isMobile && <HiddenInput ref={setInputEl}/>}
		</Container>
	)
}