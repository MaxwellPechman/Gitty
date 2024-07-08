import iconCode from "../assets/icons/projects/small/Code.png";
import iconGame from "../assets/icons/projects/small/Game.png";
import iconWebsite from "../assets/icons/projects/small/Website.png";
import iconDatabase from "../assets/icons/projects/small/Database.png";
import iconOther from "../assets/icons/projects/small/Other.png";
import {Project, ProjectType} from "../types/project.ts";

export const emptyProject: Project = {
    pid: 0,
    projectName: "",
    projectStatus: true,
    projectType: 0,
    projectDescription: ""
}

export const projectTypes: ProjectType[] = [
    {
        type: "Code",
        code: 1
    },
    {
        type: "Game",
        code: 2
    },
    {
        type: "Website",
        code: 3
    },
    {
        type: "Database",
        code: 4
    },
    {
        type: "Other",
        code: 0
    }
]

export function projectTypeToCode(projectType: string) {
    switch (projectType) {
        case "Code":
            return 1
        case "Game":
            return 2
        case "Website":
            return 3
        case "Database":
            return 4
        default:
            return 0
    }
}

export function getProjectIcon(projectType: number | undefined) {
    switch (projectType) {
        case 1:
            return iconCode
        case 2:
            return iconGame
        case 3:
            return iconWebsite
        case 4:
            return iconDatabase
        default:
            return iconOther
    }
}

export function projectCodeToType(projectCode: number | undefined) {
    switch (projectCode) {
        case 1:
            return "Code"
        case 2:
            return "Game"
        case 3:
            return "Website"
        case 4:
            return "Database"
        default:
            return "Other"
    }
}