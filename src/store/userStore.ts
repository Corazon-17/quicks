import { create } from "zustand";

type Id = number | null;

interface User {
  id: Id;
  setId: (newId: Id) => void;
}

export const useUserStore = create<User>((set) => ({
  id: null,
  setId: (newId: Id) => set({ id: newId }),
}));
