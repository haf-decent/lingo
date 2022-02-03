import styled from "styled-components";
import { CenteredFlex } from "../Styles/Flex";

const Container = styled(CenteredFlex).attrs(() => ({
	column: true
}))`
	position: fixed;
	bottom: 0px;
	width: 100vw;
	height: 160px;
	max-width: 380px;

	background-color: white;
	box-shadow: 0px 3px 13px rgba(0,0,0,0.4);
	@media (prefers-color-scheme: dark) {
		background-color: #363636;
		box-shadow: 0px 5px 20px rgba(0,0,0,0.8);
	}

	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;

const KeyRow = styled(CenteredFlex)``;

const Key = styled(CenteredFlex)`
	min-width: 30px;
	height: 38px;
	margin: 1.5px;
	padding: 8px;
	border-radius: 4px;
	border: 1px solid #ddd;
	// box-shadow: 0px 3px 7px rgba(0,0,0,0.25);

	text-transform: uppercase;
	cursor: pointer;

	background-color: ${({ status = null, special = false }) => {
		if (special) return `rgba(0,0,0,0.8); color: white`;
		switch(status) {
			case "unused":
				return `#bbb`;
			case "misplaced":
				return `yellow`;
			case "correct":
				return `#00ff00`;
			default:
				return `#eee`;
		}
	}};

	@media (prefers-color-scheme: dark) {
		text-shadow: 0px 0px 4px black;
		font-weight: 700;
		background-color: ${({ status = null, special = false }) => {
			if (special) return `rgba(0,0,0,0.8); color: white`;
			switch(status) {
				case "unused":
					return `#bbb`;
				case "misplaced":
					return `yellow`;
				case "correct":
					return `#00ff00`;
				default:
					return `#333`;
			}
		}};
	}
`;

const keyboardArr = [
	"qwertyuiop".split(""),
	"asdfghjkl".split(""),
	"zxcvbnm".split("")
];

export function Keyboard({ letterState, onInput, onEnter, onBackspace }) {

	return (
		<Container>
			{keyboardArr.map((row, r) => (
				<KeyRow key={r}>
					{row.map((key, i) => (
						<Key
							key={i}
							status={letterState[ key ] || null}
							special={key.length > 1}
							onClick={() => onInput(key)}>
							{key}
						</Key>
					))}
					{r === 1 && (
						<Key
							special={true}
							onClick={onBackspace}>
							{"\u21e6"}
						</Key>
					)}
					{r === 2 && (
						<Key
							special={true}
							onClick={onEnter}>
							enter
						</Key>
					)}
				</KeyRow>
			))}
		</Container>
	)
}