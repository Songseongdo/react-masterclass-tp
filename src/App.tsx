import styled, { keyframes } from "styled-components";

const Title = styled.h1`
	color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.backgroundColor};
	width: 400px;
	height: 50px;
	text-align: center;
`;
const Wrapper = styled.div`
	width: 90vw;
	height: 50vh;
	display: flex;
	gap: 10px;
	justify-content: center;
	align-items: center;
`;

const rotateAnimation = keyframes`
	0% {
		transform: rotate(0deg);
		border-radius: 0px;
	}
	50% {
		border-radius: 100px;
	}
	100% {
		transform: rotate(360deg);
		border-radius: 0px;
	}
`;
const Emoji = styled.span`
	font-size: 36px;
`;
const Box1 = styled.div`
	width: 200px;
	height: 200px;
	background-color: tomato;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${rotateAnimation} 2s infinite;

	${Emoji} {
		&:hover {
			font-size: 90px;
		}
	}
`;

function App() {
	return (
		<>
			<Title>테마 적용</Title>
			<Wrapper>
				<Box1>
					<Emoji>😉</Emoji>
				</Box1>
				<Emoji as="p">😒</Emoji>
			</Wrapper>
		</>
	);
}

export default App;
