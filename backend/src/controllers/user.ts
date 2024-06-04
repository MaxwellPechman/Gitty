import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {
    PasswordRequest,
    requestId,
    UserLogin,
    UserLoginResponse,
    UserRegister,
    UserRegisterResponse
} from "../types/user";
import {createUniqueSessionsID} from "../utils/sessions";
import {sha256} from "../utils/crypto";

export async function registerUser(db: PostgresClient, sql: SQLFileManager, userData: UserRegister): Promise<UserRegisterResponse> {
    const data = [userData.name, userData.mail, sha256(userData.password)]

    return createUniqueSessionsID(db, sql)
        .then((sessionId) => {
            return db.execute(sql.getSQLStatement("registerUser.sql"), data)
                .then(() => {
                   return db.execute(sql.getSQLStatement("createSession.sql"), [sessionId, userData.name])
                        .then(() => {
                            return {
                                session: sessionId,
                            }
                        })
                })
        })
}

// TODO needs some error checking
export async function loginUser(db: PostgresClient, sql: SQLFileManager, userData: UserLogin): Promise<UserLoginResponse | null> {
    const sessionID = await createUniqueSessionsID(db, sql)
    const result: PasswordRequest = await db.query(sql.getSQLStatement("selectUser.sql"), [userData.username])
    const password: string | undefined = result[0]?.password

    if(password !== undefined) {
        if(password === sha256(userData.password)) {
            return {
                session: sessionID
            }
        }
    }

    return {
        session: ""
    }
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