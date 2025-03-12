import { Categories } from "../const";
export interface IForm {
	toDo: string;
}

export interface IToDo {
	text: string;
	id: number;
	category: Categories;
}

export interface ITrelloToDo {
	text: string;
	id: number;
}
