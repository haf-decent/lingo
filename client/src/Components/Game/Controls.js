import styled from "styled-components";

import { useTimer } from "../../Hooks/useTimer";

import { CenteredFlex, Flex } from "../Styles/Flex";

const Container = styled(Flex).attrs(() => ({
	justify: "space-between",
	align: "center"
}))`
	width: ${({ width }) => width}px;
	margin: 15px;
	padding: 15px;
	border-radius: 10px;
	box-shadow: inset 0px 3px 11px rgba(0,0,0,0.3);
`;

const Status = styled(CenteredFlex)`
	height: 40px;
	padding: 0px 10px;
	color: gray;
	& > strong {
		text-transform: uppercase;
	}
`;

const ResetButton = styled(CenteredFlex)`
	height: 40px;
	padding: 10px;
	border-radius: 5px;
	color: gray;
	box-shadow: 0px 3px 11px rgba(0,0,0,0.3);
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