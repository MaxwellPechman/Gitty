export type ProfileResponse = {
    username: string;
    mail: string;
    userPicture: null | string;
    projects: Projects[];
    tasks: Tasks[];
}

type Projects = {
    pid: number;
    projectName: string;
    projectType: string;
    projectStatus: boolean;
    created: string;
    lastUpdated: string;
}

type Tasks = {
    tid: number;
    task_name: string;
    project_name: string;
    task_status: string;
    order: number;
    Action: string;
}