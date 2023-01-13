import { create } from "zustand";

interface Quick {
  active: string | null;
  expand: boolean;
  setActive: (newActive: string | null) => void;
  setExpand: (newActive: boolean) => void;
}

export const useQuickStore = create<Quick>((set) => ({
  active: null,
  expand: false,
  setActive: (newActive: string | null) => set({ active: newActive }),
  setExpand: (isExpand: boolean) => set({ expand: isExpand }),
}));
