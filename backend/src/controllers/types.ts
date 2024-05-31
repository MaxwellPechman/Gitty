import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {requestId} from "../types/user";

export async function getTypes(db: PostgresClient, type_classification: requestId) {
    const values = [type_classification.id]
    const SQL = `
    SELECT typeId, type_name FROM types
    WHERE type_classification = $1;
    `

    return await db.query(SQL, values)
}