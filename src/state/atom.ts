import { atom, selector } from "recoil";
import { IToDo, ITrelloToDo } from "../interface";
import { Categories } from "../const";

export const isDarkAtom = atom({
	key: "isDark",
	default: true,
});

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
});

const localStorageEffect =
	(key: string) =>
	({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue !== null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue: string, _: any, isReset: any) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
	effects_UNSTABLE: [localStorageEffect("to_Do_List")],
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter((value) => value.category === +category);
	},
});

export const minuteState = atom<number>({
	key: "minuteValue",
	default: 0,
});
export const hourSelector = selector<number>({
	key: "hours",
	get: ({ get }) => {
		const minuetes = get(minuteState);
		return minuetes / 60;
	},
	set: ({ set }, newValue) => {
		set(minuteState, +newValue * 60);
	},
});

interface ITrelloState {
	[key: string]: ITrelloToDo[];
}
export const trelloState = atom<ITrelloState>({
	key: "trelloToDo",
	default: {
		to_do: [],
		doing: [],
		done: [],
	},
});
