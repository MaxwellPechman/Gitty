import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {newProject} from "../types/project";

export async function createProject(db: PostgresClient, sql: SQLFileManager, projectData: newProject) {
    const dataNewProject = [projectData.projectName, projectData.projectType]
    db.execute(sql.getSQLStatement("createProject.sql"), dataNewProject).then(() => {})
    const dataLinkUser = [projectData.uid]
    await db.execute(sql.getSQLStatement("createLinkUserProject.sql"), dataLinkUser)

}