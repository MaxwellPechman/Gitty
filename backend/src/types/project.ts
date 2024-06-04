export type Project = {
    pid: number,
    projectName: string;
    projectType?: number;
    projectStatus: boolean;
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
    uid: number;
}