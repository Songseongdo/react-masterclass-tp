import React, { FunctionComponent } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

interface ICard {
	isDragging: boolean;
}
const Card = styled.div<ICard>`
	background-color: ${(props) => (props.isDragging ? "#74b9ff" : "white")};
	box-shadow: ${(props) =>
		props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
	width: 100%;
	margin: 0 auto;

	color: black;
	border-radius: 5px;
	margin-bottom: 5px;
	padding: 10px;
`;

const DraggableCard: FunctionComponent<IDraggableCardProps> = ({
	toDoId,
	toDoText,
	index,
}) => {
	// console.log(toDo, "has been rendered");

	return (
		<Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
			{(provided, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
				>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
};

export default React.memo(DraggableCard);
