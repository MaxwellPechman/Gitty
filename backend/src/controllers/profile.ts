import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {SessionRequest, SessionUserId} from "../types/session";
import {ProfileResponse} from "../types/profile";

export async function getProfileData(db: PostgresClient, sql: SQLFileManager, userData: SessionRequest): Promise<any> {
    const result: SessionUserId | undefined = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [userData.session])

    // TODO logic needs to be changed here
    if(result == undefined) {
        console.log("No user id was found.")

    } else {
        const userId = result[0].uid
        const userData = await db.query(sql.getSQLStatement("selectUserByUserId.sql"), [userId])
        const projectData = await db.query(sql.getSQLStatement("selectUserProjects.sql"), [userId])
        const taskData = await db.query(sql.getSQLStatement("selectUserTasks.sql"), [userId])

        console.log(userData, projectData, taskData)
    }
}