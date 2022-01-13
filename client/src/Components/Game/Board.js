import { useEffect, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { CenteredFlex, Flex } from "../Styles/Flex";

import { LetterSlot } from "./LetterSlot";

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	padding: 10px;
	border-radius: 10px;
	box-shadow: inset 0px 3px 11px rgba(0,0,0,0.3);
`;

const RowContainer = styled(Flex).attrs(() => ({
	align: "center"
}))`
	&:not(:first-of-type) {
		border-top: 2px solid rgba(0,0,0,0.05);
	}
`;

const HiddenInput = styled.input`
	display: none;
`;

const allowed = "abcdefghijklmnopqrstuvwxyz".split("");

export function Board({ enabled, gameState, onInput, onBackspace, onEnter, size }) {
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
				<RowContainer key={i}>
					{row.map(({ letter, status }, r) => (
						<LetterSlot
							key={r}
							letter={letter}
							status={status}
							size={size}
						/>
					))}
				</RowContainer>
			))}
			{isMobile && <HiddenInput ref={setInputEl}/>}
		</Container>
	)
}