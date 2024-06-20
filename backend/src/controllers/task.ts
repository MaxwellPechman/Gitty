import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {newTask} from "../types/project";

export async function createTask(db: PostgresClient, sql: SQLFileManager, taskData: newTask) {
    var uid = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [taskData.uid])

    var typeId = await db.query(sql.getSQLStatement("selectSingleProject.sql"), [taskData.taskPid, uid[0].uid])

    const dataNewTask = [taskData.taskName, taskData.taskStatus, taskData.taskDescription, typeId[0].pid]

    var tid = await db.query(sql.getSQLStatement("createTask.sql"), dataNewTask);
    const dataLink = [tid[0].tid, uid[0].uid]

    await createUserLink(db, sql, dataLink)

    return true
}

export async function createUserLink(db: PostgresClient, sql: SQLFileManager, data: any[]) {
    await db.execute(sql.getSQLStatement("createLinkUserTask.sql"), data)
}