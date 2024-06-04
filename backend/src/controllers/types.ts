import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";

export async function getTypes(db: PostgresClient, sql: SQLFileManager,) {
    return await db.query(sql.getSQLStatement("selectTypes.sql"), [])
}