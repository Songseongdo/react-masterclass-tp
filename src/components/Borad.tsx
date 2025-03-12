import { FunctionComponent } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ITrelloToDo } from "../interface";
import { trelloState } from "../state/atom";

const Wrapper = styled.div`
	width: 200px;
	padding-top: 10px;
	background-color: #dadfe9;
	border-radius: 5px;
	min-height: 300px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.div`
	color: black;
	margin-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
	text-align: center;
`;

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver
			? "#dfe6e9"
			: props.isDraggingFromThis
			? "#b2bec3"
			: "transparent"};
	border-radius: 5px;
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;
const Form = styled.form`
	width: 100%;
	display: flex;
	justify-content: center;

	input: {
		width: 100%;
	}
`;

interface IBordProps {
	toDos: ITrelloToDo[];
	boardId: string;
}
interface IForm {
	toDo: string;
}
const Bord: FunctionComponent<IBordProps> = ({ toDos, boardId }) => {
	const setTrelloToDos = useSetRecoilState(trelloState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};

		setTrelloToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [newToDo, ...allBoards[boardId]],
			};
		});

		setValue("toDo", "");
	};
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input
					{...register("toDo", { required: true })}
					type="text"
					placeholder={`Add task on ${boardId}`}
				/>
			</Form>

			<Droppable droppableId={boardId}>
				{(DroppableProvider, info) => (
					<Area
						isDraggingOver={info.isDraggingOver}
						isDraggingFromThis={Boolean(info.draggingFromThisWith)}
						ref={DroppableProvider.innerRef}
						{...DroppableProvider.droppableProps}
					>
						{toDos.map((toDo, index) => (
							<DraggableCard
								key={toDo.id}
								index={index}
								toDoId={toDo.id}
								toDoText={toDo.text}
							/>
						))}
						{DroppableProvider.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
};

export default Bord;
