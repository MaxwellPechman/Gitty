export type Project = {
    pid: number,
    projectName: string;
    projectType?: number;
    projectStatus: boolean;
}

export type newProject = {
    pid: number,
    projectName: string;
    projectType?: number;
    projectStatus: boolean;
    uid: number;
}