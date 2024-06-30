import {create} from "zustand";
import {Project} from "../types/project.ts";

interface ProjectsStore {
    projects: Project[]
    setProjects: (projects: Project[]) => void;
    updateProjects: (projects: Project[]) => void;
}

// Zustand "store-hook" to store all projects that the user is involved in
export const useProjectsStore = create<ProjectsStore>((set) => ({
    // Variable that contains all the stored projects of a user
    projects: [],

    // Function that can be used to set the projects
    setProjects: (projects) => set({ projects }),

    // Function to update projects
    updateProjects: (projects) =>
        // Sets the current projects as a basis
        set((state) => ({
            // Extends current projects with a new project
            projects: [...state.projects, ...projects],
        })),
}))
