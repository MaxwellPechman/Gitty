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

export type newProject = {
    pid: number,
    projectName: string;
    projectType?: string;
    projectStatus: boolean;
    projectDescription?: string;
    uid: number;
}