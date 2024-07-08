export type Project = {
    pid: number,
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
    projectType?: number;
}

export type CreateProjectRequest = {
    sessionId: string;
    project: Project
}

export type CreateProjectResponse = {
    pid: number
}

export type newProject = {
    pid: number,
    projectName: string;
    projectType?: string;
    projectStatus: boolean;
    projectDescription: string;
    uid: number;
}

export type newTask = {
    tid: number;
    taskName: string;
    taskStatus: number;
    taskDescription: string;
    taskPid: string;
    uid: string;
}