import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {newProject} from "../types/project";
import {requestId} from "../types/user";

export async function createProject(db: PostgresClient, sql: SQLFileManager, projectData: newProject) {
    var typeId = await db.query(sql.getSQLStatement("selectSingleType.sql"), [projectData.projectType])

    const dataNewProject = [projectData.projectName, typeId[0].typeid, projectData.projectDescription]

    var pid = await db.query(sql.getSQLStatement("createProject.sql"), dataNewProject);
    const dataLink = [pid[0].pid, projectData.uid]

    await createUserLink(db, sql, dataLink)

    return true
}

export async function createUserLink(db: PostgresClient, sql: SQLFileManager, data: any[]) {
    await db.execute(sql.getSQLStatement("createLinkUserProject.sql"), data)
}

export async function getProjectById(db: PostgresClient, sql: SQLFileManager, projectId: requestId) {
    const values = [projectId.id]

    return await db.query(sql.getSQLStatement("selectProjectById.sql"), values)
}