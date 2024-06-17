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
import {SessionUserId} from "../types/session";

export async function registerUser(db: PostgresClient, sql: SQLFileManager, userData: UserRegister): Promise<UserRegisterResponse | void> {
    const data = [userData.name, userData.mail, sha256(userData.password)]

    return createUniqueSessionsID(db, sql)
        .then((sessionId) => {
            return db.query(sql.getSQLStatement("registerUser.sql"), data)
                .then((result: SessionUserId) => {
                    return db.execute(sql.getSQLStatement("createSession.sql"), [sessionId, result[0].uid])
                        .then(() => {
                            return {
                                session: sessionId,
                            }
                        }).catch((err) => {
                            console.log("Error when creating session:", err) // TODO logging
                       })
                }).catch((err) => {
                    console.log("Error when registering user:", err) // TODO logging
                })
        })
        .catch((err) => {
            console.log("Error when creating session ID:", err) // TODO logging
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

export async function getUserTasks(db: PostgresClient, sql: SQLFileManager, userData: requestId) {
    const values = [userData.id]

    return await db.query(sql.getSQLStatement("selectUserTasks.sql"), values)
}