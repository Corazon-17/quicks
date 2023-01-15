import { TaskModel } from "@/types";
import { create } from "zustand";

interface Task {
  userId: number | null;
  taskData: TaskModel[];
  setUserId: (newUserId: number) => void;
  setTaskData: (newTaskData: TaskModel[]) => void;
  addNewTask: (newTask: TaskModel) => void;
}

export const useTaskStore = create<Task>((set, get) => ({
  userId: null,
  taskData: [],
  setUserId: (newUserId: number) => set({ userId: newUserId }),
  setTaskData: (newTaskData: TaskModel[]) => set({ taskData: newTaskData }),
  addNewTask: (newTask: TaskModel) => {
    set({ taskData: [newTask, ...get().taskData] });
  },
}));
