import {Task} from "../types/task.ts";
import {create} from "zustand";

interface TasksStore {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    updateTasks: (tasks: Task[]) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: [],

    setTasks: (tasks) => set({ tasks }),

    updateTasks: (tasks) =>
        set((state) => ({
            tasks: [...state.tasks, ...tasks],
    }))
}))