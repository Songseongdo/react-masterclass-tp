// import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../state/atom";

import { IForm } from "../interface";

export function CreateToDo() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IForm>();

	const setToDos = useSetRecoilState(toDoState);

	const handleValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category: "TO_DO" },
			...oldToDos,
		]);
		setValue("toDo", "");
	};

	return (
		<>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
				onSubmit={handleSubmit(handleValid)}
			>
				<input
					{...register("toDo", {
						required: "Pease write a To Do",
					})}
					placeholder="Wirte a to do"
				/>
				<span>{errors?.toDo?.message}</span>
				<button>Add</button>
			</form>
		</>
	);
}
