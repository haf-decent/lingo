import styled from "styled-components";

import { useTimer } from "../../Hooks/useTimer";

import { CenteredFlex, Flex } from "../Styles/Flex";

const Container = styled(Flex).attrs(() => ({
	justify: "space-between",
	align: "center"
}))`
	width: ${({ width }) => width}px;
`;

const Status = styled(CenteredFlex)`
	height: 40px;
	@media (prefers-color-scheme: dark) {
		font-weight: 700;
	}
	& > strong {
		text-transform: uppercase;
	}
`;

const ResetButton = styled(CenteredFlex)`
	height: 40px;
	padding: 4px 8px;
	border-radius: 6px;
	background-color: #eee;
	@media (prefers-color-scheme: dark) {
		font-weight: 700;
		background-color: #363636;
	}
	border: 1px solid #ddd;
	cursor: pointer;
`;

export function Controls({ width = 370, enabled, hasWon, hasLost, onReset }) {
	const [ elapsed, restart ] = useTimer(enabled);

	return (
		<Container width={width}>
			<Status>
				{hasLost
					? <>OOP - It was <strong>"{hasLost}"</strong></>
					: hasWon
						? `WINNER! - ${elapsed}`
						: enabled
							? elapsed
							: "--:--"
				}
			</Status>
			<ResetButton onClick={() => {
				onReset();
				restart();
			}}>RESET</ResetButton>
		</Container>
	)
}