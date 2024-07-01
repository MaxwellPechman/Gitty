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
        const user = await db.query(sql.getSQLStatement("selectUserByUserId.sql"), [userId])
        const projectData = await db.query(sql.getSQLStatement("selectUserOwnerProjects.sql"), [userData.session])
        const taskData = await db.query(sql.getSQLStatement("selectUserTasksDetail.sql"), [userData.session])
        console.log( user, projectData, taskData)
        return new Promise(resolve => resolve({username: user[0].username, mail: user[0].mail, projects: projectData, tasks: taskData}));
    }
}