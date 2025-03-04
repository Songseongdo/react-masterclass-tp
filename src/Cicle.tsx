import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
	bgColor: string;
	borderColor?: string;
	text?: string;
}
const Container = styled.div<CircleProps>`
	background-color: ${(props) => props.bgColor};
	width: 200px;
	height: 200px;
	border-radius: 100px;
	border-width: 3px;
	border-style: solid;
	border-color: ${(props) => props.borderColor};
	display: flex;
	justify-content: center;
	align-items: center;
`;

function Circle({
	bgColor,
	borderColor = bgColor,
	text = "default text",
}: CircleProps) {
	const [counter, setCounter] = useState(0);
	const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		console.log(e.target);
		setCounter((prv) => prv + 1);
	};

	return (
		<Container
			bgColor={bgColor}
			borderColor={borderColor}
			onClick={onClick}
		>
			{text} {counter}
		</Container>
	);
}

export default Circle;
