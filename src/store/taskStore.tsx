import { TaskModel } from "@/types";
import { create } from "zustand";

interface Task {
  userId: number | null;
  taskData: TaskModel[];
  setUserId: (newUserId: number) => void;
  setTaskData: (newTaskData: TaskModel[]) => void;
}

export const useTaskStore = create<Task>((set) => ({
  userId: null,
  taskData: [],
  setUserId: (newUserId: number) => set({ userId: newUserId }),
  setTaskData: (newTaskData: TaskModel[]) => set({ taskData: newTaskData }),
}));
