export type Task = {
    tid: number,
    taskName: string
    projectName: string
    taskDescription: string
    status: number
    action?: string
}

export type CreateTaskRequest = {
    sessionId: string;
    task: Task
}

export type CreateTaskResponse = {
    tid: number
}