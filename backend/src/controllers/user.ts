import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {requestId, UserRegister} from "../types/user";

export async function registerUser(db: PostgresClient, sql: SQLFileManager, userData: UserRegister) {
    const data = [userData.name, userData.mail, userData.password]

    await db.execute(sql.getSQLStatement("registerUser.sql"), data)
}

export async function getUserProjects(db: PostgresClient, userData: requestId) {
    const values = [userData.id]
    const SQL = `
    SELECT 
        projects.pid as pid, 
        projects.project_name as "projectName", 
        types.type_name as "projectType", 
        projects.active as "projectStatus" 
    FROM projectsusers
    JOIN projects on projectsusers.pid = projects.pid
    JOIN types on projects.project_type = types.typeId
    where uid = $1;
    `

    return await db.query(SQL, values)
}

export async function getUserTasks(db: PostgresClient, userData: requestId) {
    const values = [userData.id]
    const SQL = `
    SELECT
        tasks.taskname AS "Taskname",
        projects.project_name AS "Project",
        CASE taskstatus
            WHEN 1 THEN 'new'
            WHEN 2 THEN 'in progress'
            WHEN 3 THEN 'cancled'
            WHEN 4 THEN 'done'
        END as "Status",
        '...' AS "Action"
    FROM tasks
    JOIN projects ON tasks.pid = projects.pid
    JOIN taskUser ON tasks.tid = taskUser.tid
    where uid = $1;
    `

    return await db.query(SQL, values)
}