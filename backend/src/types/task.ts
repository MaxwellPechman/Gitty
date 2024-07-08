export type TaskOld = {
    tid: number,
    task_name: string,
    project_name: string,
    status: number
    action: string
}

export type Task = {
    tid: number,
    taskName: string
    projectName: string
    taskDescription: string
    status: number
    action: string
}

export type CreateTaskRequest = {
    sessionId: string;
    task: Task
}