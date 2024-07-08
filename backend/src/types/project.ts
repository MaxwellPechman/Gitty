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