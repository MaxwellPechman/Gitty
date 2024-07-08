export type types = {
    typeId: number
    type_name: string
}

export type requestId = {
    id: number
}

export type Project = {
    pid: number,
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
    projectType?: number;
}

export type ProjectType = {
    code: number
    type: string
}

export type CreateProjectRequest = {
    sessionId: string;
    project: Project
}

export type CreateProjectResponse = {
    pid: number
}

export type projectDetails = {
    pid: number,
    project_name: string,
    project_type?: number,
    project_description?: string,
    project_status: boolean
}

export type newProject = {
    pid: number,
    projectName: string;
    projectType?: string;
    projectStatus: boolean;
    projectDescription?: string;
    uid?: string;
}

export type newTask = {
    tid: number;
    taskName: string;
    taskStatus: number;
    taskDescription: string;
    taskPid: string;
    uid?: string;
}