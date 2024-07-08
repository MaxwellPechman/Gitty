import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {Task} from "../types/task.ts";

interface TasksStore {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    updateTasks: (task: Task) => void;
}

export const useTasksStore = create<TasksStore>()(
    persist(
        (set) => ({
            tasks: [],
            setTasks: (tasks: Task[]) => set({ tasks }),
            updateTasks: (task: Task) =>
                set((state) => ({
                    tasks: [...state.tasks, task]
                })),
        }),
        {
            name: 'tasks-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
