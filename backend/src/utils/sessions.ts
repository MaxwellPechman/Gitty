import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {v4 as uuidv4} from "uuid";

export async function createUniqueSessionsID(db: PostgresClient, sql: SQLFileManager): Promise<string> {
    const usid = uuidv4();
    const sessionIds = await db.query(sql.getSQLStatement("selectSessionIds.sql"))

    for(let index = 0; index < sessionIds.length; index++) {
        if(sessionIds[index].sessionId === usid) {
            return createUniqueSessionsID(db, sql)
        }
    }

    return usid;
}