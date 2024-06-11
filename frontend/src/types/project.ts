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
    projectType?: number;
    projectStatus: boolean;
}

export type projectDetails = {
    pid: number,
    project_name: string,
    project_type?: number,
    project_description?: string
}

export type newProject = {
    pid: number,
    projectName: string;
    projectType?: string;
    projectStatus: boolean;
    projectDescription?: string;
    uid: number;
}

export type newTask = {
    tid: number;
    taskName: string;
    taskStatus: number;
    taskDescription: string;
    taskPid: string;
    uid: number;
}