import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { toDoState } from "../state/atom";
import { CreateToDo } from "./CreateToDo";
import { ToDo } from "./ToDo";

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	padding: 30px;
`;
const Header = styled.div`
	color: ${(props) => props.theme.textColor};
	font-size: 30px;
`;
const DotoContinaer = styled.ul``;

function ToDoList() {
	const toDos = useRecoilValue(toDoState);

	return (
		<Container>
			<Header>TO DO LIST</Header>
			<hr />
			<CreateToDo />

			<DotoContinaer>
				{toDos.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</DotoContinaer>

			<div></div>
		</Container>
	);
}

export default ToDoList;
