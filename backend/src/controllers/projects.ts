import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {Project} from "../types/project";

export async function createProject(db: PostgresClient, sql: SQLFileManager, projectData: Project) {
    const data = [projectData.projectName, projectData.projectType]

    await db.execute(sql.getSQLStatement("createProject.sql"), data)
}