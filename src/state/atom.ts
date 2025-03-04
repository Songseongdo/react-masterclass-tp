import { atom } from "recoil";
import { IToDo } from "../interface";

export const isDarkAtom = atom({
	key: "isDark",
	default: true,
});

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
});
