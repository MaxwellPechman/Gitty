import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {requestId, UserRegister} from "../types/user";
import {createUniqueSessionsID} from "../utils/sessions";
import {sha256} from "../utils/crypto";

export async function registerUser(db: PostgresClient, sql: SQLFileManager, userData: UserRegister): Promise<string> {
    const data = [userData.name, userData.mail, sha256(userData.password)]
    const usid = await createUniqueSessionsID(db, sql)

    db.execute(sql.getSQLStatement("registerUser.sql"), data)
        .then(() => {
            db.execute(sql.getSQLStatement("createSession.sql"), [usid, userData.name])
                .catch((err) => {
                console.log(err); // should be logged
            })
    })
        .catch((err) => {
        console.log(err) // should be logged
    })

    return usid
}

export async function getUserProjects(db: PostgresClient, sql: SQLFileManager, userData: requestId) {
    const values = [userData.id]
    return await db.query(sql.getSQLStatement("selectUserProjects.sql"), values)
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