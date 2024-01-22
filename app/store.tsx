import create from "zustand";

export interface AppState {
	content: string;
	setContent: (newText: string) => void;
}

export const useStore = create<AppState>((set) => ({
	content: "",
	setContent: (newText) => set(() => ({ content: newText })),
}));
