import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {CreateTaskRequest} from "../types/task";

export async function createTask(db: PostgresClient, sql: SQLFileManager, taskRequest: CreateTaskRequest) {
    const taskData = taskRequest.task
    const uid = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [taskRequest.sessionId]);
    const pid = await db.query(sql.getSQLStatement("selectSingleProject.sql"), [taskData.projectName, uid[0].uid]);
    const dataNewTask = [taskData.taskName, taskData.status, taskData.taskDescription, pid[0].pid]
    const tid = await db.query(sql.getSQLStatement("createTask.sql"), dataNewTask);
    const dataLink = [tid[0].tid, uid[0].uid]

    await createUserLink(db, sql, dataLink)

    return tid[0].tid
}

export async function createUserLink(db: PostgresClient, sql: SQLFileManager, data: any[]) {
    await db.execute(sql.getSQLStatement("createLinkUserTask.sql"), data)
}

export async function updateTaskStatus(db: PostgresClient, sql: SQLFileManager, status: number, tid: number) {
    await db.execute(sql.getSQLStatement("updateTaskStatus.sql"), [status, tid])
}

export async function getTaskById(db: PostgresClient, sql: SQLFileManager, tid: any) {
    return await db.query(sql.getSQLStatement("selectTaskById.sql"), [tid[0]])
}

export async function updateTaskDescription(db: PostgresClient, sql: SQLFileManager, taskId: number, taskDescription: string) {
    const values = [taskDescription, taskId]
    await db.execute(sql.getSQLStatement("updateTaskDescription.sql"), values)
}