import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {newTask} from "../types/project";

export async function createTask(db: PostgresClient, sql: SQLFileManager, taskData: newTask) {
    console.log(taskData);

    const uid = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [taskData.uid]);
    console.log("1 geht")
    const typeId = await db.query(sql.getSQLStatement("selectSingleProject.sql"), [taskData.taskPid, uid[0].uid]);
    console.log("2 geht")
    const dataNewTask = [taskData.taskName, taskData.taskStatus, taskData.taskDescription, typeId[0].pid]
    console.log("3 geht")
    const tid = await db.query(sql.getSQLStatement("createTask.sql"), dataNewTask);
    console.log("4 geht")
    const dataLink = [tid[0].tid, uid[0].uid]
    console.log("5 geht")

    await createUserLink(db, sql, dataLink)

    return true
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