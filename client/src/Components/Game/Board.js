import { useEffect, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { CenteredFlex, Flex } from "../Styles/Flex";

import { LetterSlot } from "./LetterSlot";

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	position: relative;
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

const HiddenInput = styled.textarea`
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
`;

const allowed = "abcdefghijklmnopqrstuvwxyz".split("");

export function Board({ enabled, gameState, onInput, onBackspace, onEnter, size }) {
	const [ inputEl, setInputEl ] = useState();

	useEffect(() => {
		if (!enabled) return;

		if (!inputEl) {
			const onKeyDown = ({ key }) => {
				console.log(key);
				switch(key) {
					case "Backspace":
						return onBackspace();
					case "Enter":
						return onEnter();
					default:
						allowed.includes(key.toLowerCase()) && onInput(key);
				}
			}
			window.addEventListener("keydown", onKeyDown);

			return () => window.removeEventListener("keydown", onKeyDown);
		}

		const onMobileInput = ({ data, inputType }) => {
			switch(inputType) {
				case "deleteContentBackward":
					return onBackspace();
				case "insertLineBreak":
					return onEnter();
				case "insertText":
					return allowed.includes(data.toLowerCase()) && onInput(data);
				default:
					return;
			}
		}
		inputEl.addEventListener("input", onMobileInput);

		return () => inputEl.removeEventListener("input", onMobileInput);
	}, [ inputEl, onInput, onBackspace, onEnter, enabled ]);
	
	return (
		<Container onTouchStart={event => {
			console.log(inputEl);
			if (!inputEl) return;
			event.preventDefault();
			inputEl.click();
			inputEl.focus();
		}}>
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