import styled from "styled-components";
import { IToDo } from "../interface";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../state/atom";
import { Categories } from "../const";
import React from "react";

const List = styled.li`
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	gap: 5px;

	button[value="TO_DO"] {
		background-color: #e7ccc7;
	}
	button[value="DOING"] {
		background-color: #5c5ae6;
	}
	button[value="DONE"] {
		background-color: #06d406;
	}
`;

interface IOption {
	label: string;
	name: string;
	id: string;
	value: Categories;
}

export function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);

	const radioOption: IOption[] = [
		{
			label: "TO_DO",
			name: "Todo-item",
			value: Categories.TO_DO,
			id: `${id}_TODO`,
		},
		{
			label: "DOING",
			name: "Todo-item",
			value: Categories.DOING,
			id: `${id}_DOING`,
		},
		{
			label: "DONE",
			name: "Todo-item",
			value: Categories.DONE,
			id: `${id}_DONE`,
		},
	];

	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { value },
		} = event;

		setToDos((oldToDos) => {
			const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: +value };

			return [
				...oldToDos.slice(0, targetIdx),
				newToDo,
				...oldToDos.slice(targetIdx + 1),
			];
		});
	};

	return (
		<List key={`key_${id}`}>
			<span>{text}</span>
			{radioOption.map((item) => (
				<React.Fragment key={`${item.id}__${id}`}>
					{category !== item.value && (
						<button value={item.value} onClick={onClick}>
							{item.label}
						</button>
					)}
				</React.Fragment>
			))}
		</List>
	);
}
