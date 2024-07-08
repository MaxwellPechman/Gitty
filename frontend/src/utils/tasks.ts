import {Task} from "../types/task.ts";

export const emptyTask: Task = {
    tid: 0,
    taskName: "",
    projectName: "",
    taskDescription: "",
    status: 0
}

export function getTaskStatus(code: number) {
    switch (code) {
        case 0:
             return  "new"

        case 1:
            return "active"

        case 2:
             return "done"

        default:
            return "canceled"
    }
}