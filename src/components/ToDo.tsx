import styled from "styled-components";
import { IToDo } from "../interface";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../state/atom";

const List = styled.li`
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

interface IOption {
	label: string;
	name: string;
	id: string;
	value: IToDo["category"];
}

export function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const radioOption = (id: number): IOption[] => [
		{
			label: "TO_DO",
			name: "Todo-item",
			value: "TO_DO",
			id: `${id}_TODO`,
		},
		{
			label: "DOING",
			name: "Todo-item",
			value: "DOING",
			id: `${id}_DOING`,
		},
		{
			label: "DONE",
			name: "Todo-item",
			value: "DONE",
			id: `${id}_DONE`,
		},
	];

	// const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
	// 	console.log(event.target.value);

	// 	let newArr = [];
	// 	for (let i = 0; i < ToDo.length; i++) {
	// 		let Todo = { ...ToDo[i] };
	// 		if (id === ToDo[i].id) {
	// 			Todo.category = "DOING";
	// 		}
	// 		newArr.push(ToDo);
	// 	}
	// 	setToDos(ToDo);
	// };
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { value },
		} = event;

		console.log(value);
		setToDos((oldToDos) => {
			const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: value as IToDo["category"] };

			return [
				...oldToDos.slice(0, targetIdx),
				newToDo,
				...oldToDos.slice(targetIdx + 1),
			];
		});
	};
	return (
		<>
			<List>
				<span>{text}</span>
				{radioOption(id).map((item) => (
					<>
						{category !== item.value && (
							<button value={item.value} onClick={onClick}>
								{item.label}
							</button>
						)}
					</>
				))}

				{/* {radioOption.map((item) => (
					<>
						<input
							type="radio"
							value={item.value}
							key={item.id}
							id={item.id}
							onChange={onChangeHandler}
							checked={category === item.value}
						/>
						<label htmlFor={item.id}>{item.label}</label>
					</>
				))} */}
			</List>
		</>
	);
}
