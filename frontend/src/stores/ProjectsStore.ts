import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Project } from '../types/project';

interface ProjectsStore {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    updateProjects: (project: Project) => void;
}

export const useProjectsStore = create<ProjectsStore>()(
    persist(
        (set) => ({
            projects: [],
            setProjects: (projects: Project[]) => set({ projects }),
            updateProjects: (project: Project) =>
                set((state) => ({
                    projects: [...state.projects, project]
                })),
        }),
        {
            name: 'projects-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
