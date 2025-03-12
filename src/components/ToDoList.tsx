import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../state/atom";
import { CreateToDo } from "./CreateToDo";
import { ToDo } from "./ToDo";
import React from "react";

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	padding: 30px;

	hr {
		width: 100%;
	}
`;
const Header = styled.div`
	color: ${(props) => props.theme.textColor};
	font-size: 30px;
`;
const ToDoContainer = styled.ul``;
const Title = styled.h1`
	font-size: 25px;
`;

const TitleArr = ["To DO", "Doing", "Done"];

function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const category = useRecoilValue(categoryState);

	return (
		<Container>
			<Header>TO DO LIST</Header>

			<CreateToDo />
			<hr />

			<Title>{TitleArr[category]}</Title>
			<ToDoContainer>
				{toDos.map((toDo, index) => (
					<React.Fragment key={`${toDo.id}_${index}_${toDo.text}`}>
						<ToDo {...toDo} />
					</React.Fragment>
				))}
			</ToDoContainer>
		</Container>
	);
}

export default ToDoList;
