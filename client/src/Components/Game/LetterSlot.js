import styled from "styled-components";

import { CenteredFlex } from "../Styles/Flex";

const Container = styled(CenteredFlex)`
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
	margin: 3px;
	border-radius: ${({ size }) => size / 2}px;

	// box-shadow: ${({ invert = false }) => invert ? "inset": ""} 0px 3px 11px rgba(0,0,0,0.3);
	
	text-transform: uppercase;

	${({ status = null }) => {
		switch(status) {
			case "selected":
				return `border: 8px solid black;`;
			case "unused":
				return `border: 8px solid #aaa;`;
			case "misplaced":
				return `border: 8px solid yellow;`;
			case "correct":
				return `border: 8px solid #00ff00;`;
			default:
				return `border: 1px solid #ddd;`;
		}
	}}

	@media (prefers-color-scheme: dark) {
		font-weight: 700;
		${({ status = null }) => {
			switch(status) {
				case "selected":
					return `border: 8px solid white;`;
				case "unused":
					return `border: 8px solid #aaa;`;
				case "misplaced":
					return `border: 8px solid yellow;`;
				case "correct":
					return `border: 8px solid #00ff00;`;
				default:
					return `border: 1px solid #ddd;`;
			}
		}}
	}
`;

export function LetterSlot({ letter = "_", status, size = 60, invert = false }) {

	return (
		<Container
			size={size}
			status={status}
			invert={invert}
		>
			{letter}
		</Container>
	)
}