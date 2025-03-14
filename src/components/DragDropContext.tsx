import { FunctionComponent, useRef } from "react";
import { DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { trelloState } from "../state/atom";
import Board from "./Borad";

interface IDraggableCardProps {}

const Wrapper = styled.div`
	display: flex;
	max-width: 600px;
	width: 100%;
	height: 400px;
	padding-top: 30px;
	margin: 0 auto;
	justify-content: center;
`;
const Boards = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;
`;

const Trash = styled.div`
	width: 100px;
	height: 50px;
	margin: 20px auto;
	background-color: #dadfe9;
	padding-top: 10px;
	border-radius: 10px;
`;
const TrashArea = styled.div<IAreaProps>`
	/* background-color: ${(props) => (props.isDraggingOver ? "#1cabe9" : props.isDraggingFromThis ? "#515455" : "transparent")}; */
`;
const Title = styled.div`
	color: black;
	margin-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
	text-align: center;
`;
interface IAreaProps {
	isDraggingOver?: boolean;
	isDraggingFromThis?: boolean;
}
const DraggingContainer = styled.div`
	width: 100%;
	height: 250px;
	background-color: blue;
	padding: 10px;

	position: relative;
`;
const DropContainer = styled.div<IAreaProps>`
	display: flex;
	justify-content: center;
	gap: 10px;
	width: 100%;
	height: 100%;
	background-color: darkcyan;
	padding: 0px 10px;

	position: relative;
`;
interface ICard {
	isDragging: boolean;
}
const DragingArea = styled.div<ICard>`
	width: 100px;
	height: 100%;
	background-color: ${(props) => (props.isDragging ? "#74b9ff" : "darkgrey")};
	margin-left: 10px;
`;
const DragginTitle = styled.div`
	color: black;
`;

let TestArr = [
	{ id: "1", text: "D1" },
	{ id: "2", text: "D2" },
	{ id: "3", text: "D3" },
];

const DragDropCont: FunctionComponent<IDraggableCardProps> = () => {
	const [trelloToDos, setTrelloToDos] = useRecoilState(trelloState);
	const draggableRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		if (!destination) {
			console.log(draggableId, destination, source);

			return;
		}

		if (source.droppableId === "TEST" || destination.droppableId === "TEST") {
			[TestArr[source.index], TestArr[destination.index]] = [TestArr[destination.index], TestArr[source.index]];

			return;
		}

		if (destination?.droppableId === source.droppableId) {
			// same board movement.
			setTrelloToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		} else {
			setTrelloToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];

				if (destination.droppableId === "Trash") {
					sourceBoard.splice(source.index, 1);

					return {
						...allBoards,
						[source.droppableId]: sourceBoard,
					};
				}

				const destBoard = [...allBoards[destination.droppableId]];
				const taskObj = sourceBoard[source.index];
				sourceBoard.splice(source.index, 1);
				destBoard.splice(destination?.index, 0, taskObj);

				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destBoard,
				};
			});
		}
	};
	function getStyle(style: DraggingStyle | NotDraggingStyle) {
		if (style?.transform) {
			const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
			return {
				...style,
				transform: axisLockX,
			};
		}
		return style;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Trash>
				<Title>Trash</Title>
				<Droppable droppableId="Trash">
					{(DroppableProvider, info) => (
						<TrashArea ref={DroppableProvider.innerRef} {...DroppableProvider.droppableProps} isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)}>
							{DroppableProvider.placeholder}
						</TrashArea>
					)}
				</Droppable>
			</Trash>
			<DraggingContainer>
				<Droppable droppableId="TEST" type="GROUP-A" direction="horizontal">
					{(droppableProvider, info) => (
						<DropContainer
							isDraggingOver={info.isDraggingOver}
							// isDraggingFromThis={Boolean(
							// 	info.draggingFromThisWith
							// )}
							ref={droppableProvider.innerRef}
							{...droppableProvider.droppableProps}
						>
							{TestArr.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provider, snapshot) => {
										return (
											<DragingArea
												ref={(el) => {
													provider.innerRef(el);
													draggableRefs.current[item.id] = el;
												}}
												{...provider.draggableProps}
												isDragging={snapshot.isDragging}
												style={getStyle(provider.draggableProps.style!)}
											>
												<DragginTitle {...provider.dragHandleProps}>{item.text}</DragginTitle>
											</DragingArea>
										);
									}}
								</Draggable>
							))}

							{droppableProvider.placeholder}
						</DropContainer>
					)}
				</Droppable>
			</DraggingContainer>
			<Wrapper>
				<Boards>
					{Object.keys(trelloToDos).map((boardId) => (
						<Board boardId={boardId} key={boardId} toDos={trelloToDos[boardId]} />
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
};

export default DragDropCont;
