// import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../state/atom";

import { IForm } from "../interface";
import { Categories } from "../const";

export function CreateToDo() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IForm>();

	const setToDos = useSetRecoilState(toDoState);
	const [category, setCategory] = useRecoilState(categoryState);

	const handleValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category: category },
			...oldToDos,
		]);
		setValue("toDo", "");
	};
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		const {
			currentTarget: { value },
		}: { currentTarget: { value: any } } = event;

		setCategory(value);
	};

	return (
		<>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "5px",
				}}
				onSubmit={handleSubmit(handleValid)}
			>
				<div>
					<input
						{...register("toDo", {
							required: "Pease write a To Do",
						})}
						placeholder="Wirte a to do"
						style={{
							marginRight: "5px",
						}}
					/>
					<select value={category} onInput={onInput}>
						<option value={Categories.TO_DO}>To Do</option>
						<option value={Categories.DOING}>Doing</option>
						<option value={Categories.DONE}>Done</option>
					</select>
				</div>

				<span>{errors?.toDo?.message}</span>

				<button>Add</button>
			</form>
		</>
	);
}
