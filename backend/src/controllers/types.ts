import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {requestId} from "../types/user";

export async function getTypes(db: PostgresClient, sql: SQLFileManager, type_classification: requestId) {
    const values = [type_classification.id]

    return await db.query(sql.getSQLStatement("selectTypes.sql"), values)
}