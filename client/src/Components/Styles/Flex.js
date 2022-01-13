import styled from "styled-components";

export const Flex = styled.div`
	display: flex;
	flex-direction: ${({ column = false }) => column ? "column": "row"};
	justify-content: ${({ justify = "flex-start" }) => justify};
	align-items: ${({ align = "flex-start" }) => align};
  ${({ wrap = false }) => wrap && "flex-wrap: wrap;"}
  ${({ grow = 0, shrink = 0 }) => `
    flex-grow: ${grow};
    flex-shrink: ${shrink};
  `}
`;

export const CenteredFlex = styled(Flex).attrs(() => ({
	justify: "center",
	align: "center"
}))``;