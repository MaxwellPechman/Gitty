import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {SessionRequest, SessionUserId} from "../types/session";

export async function getProfileData(db: PostgresClient, sql: SQLFileManager, userData: SessionRequest): Promise<any> {
    const result: SessionUserId | undefined = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [userData.session])

    // TODO logic needs to be changed here
    if(result == undefined) {
        console.log("No user id was found.")

    } else {
        const userId = result[0].uid
        const user = await db.query(sql.getSQLStatement("selectUserByUserId.sql"), [userId])
        const projectData = await db.query(sql.getSQLStatement("selectUserOwnerProjects.sql"), [userData.session])
        const taskData = await db.query(sql.getSQLStatement("selectUserTasksDetail.sql"), [userData.session])

        return new Promise(resolve => resolve({username: user[0].username, userPicture: user[0].img, mail: user[0].mail, projects: projectData, tasks: taskData}));
    }
}

export async function uploadProfilePicture(db: PostgresClient, sql: SQLFileManager, sid: string, imgContent: string) {
    const result: SessionUserId | undefined = await db.query(sql.getSQLStatement("selectUserIdBySessionId.sql"), [sid])

    if(result == undefined) {
        console.log("No user id was found.")

    } else {
        await db.query(sql.getSQLStatement("addProfilePicture.sql"), [imgContent, result[0].uid])
    }
}