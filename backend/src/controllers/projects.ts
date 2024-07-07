import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {CreateProjectRequest} from "../types/project";
import {requestId} from "../types/user";

export async function createProject(db: PostgresClient, sql: SQLFileManager, requestData: CreateProjectRequest) {
    const project = requestData.project
    const uid = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [requestData.sessionId])
    console.log(uid)
    const pid = await db.query(sql.getSQLStatement("createProject.sql"),
        [project.projectName, project.projectType, project.projectDescription]);

    await createUserLink(db, sql, [pid[0].pid, uid])

    return pid[0].pid;
}

export async function createUserLink(db: PostgresClient, sql: SQLFileManager, data: any[]) {
    await db.execute(sql.getSQLStatement("createLinkUserProject.sql"), data)
}

export async function getProjectById(db: PostgresClient, sql: SQLFileManager, projectId: requestId) {
    return await db.query(sql.getSQLStatement("selectProjectById.sql"), [projectId.id])
}

export async function getProjectTasks(db: PostgresClient, sql: SQLFileManager, projectId: number) {
    return await db.query(sql.getSQLStatement("selectProjectTasks.sql"), [projectId])
}

export async function updateProjectDescription(db: PostgresClient, sql: SQLFileManager, projectId: number, projectDescription: string) {
    await db.execute(sql.getSQLStatement("updateProjectDescription.sql"), [projectDescription, projectId])
}