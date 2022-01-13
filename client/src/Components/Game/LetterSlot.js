import styled from "styled-components";

import { CenteredFlex } from "../Styles/Flex";

const Container = styled(CenteredFlex)`
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
	margin: 5px;
	border-radius: ${({ size }) => size / 2}px;

	box-shadow: 0px 3px 11px rgba(0,0,0,0.3);
	
	text-transform: uppercase;
	color: gray;

	${({ status = null }) => {
		switch(status) {
			case "selected":
				return `border: 8px solid black;`;
			case "unused":
				return `border: 8px solid rgba(0,0,0,0.4);`;
			case "misplaced":
				return `border: 8px solid yellow;`;
			case "correct":
				return `border: 8px solid #00ff00;`;
			default:
				return `border: none;`;
		}
	}}
`;

export function LetterSlot({ letter = "_", status }) {

	return (
		<Container size={60} status={status}>
			{letter}
		</Container>
	)
}