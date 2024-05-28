import {PostgresClient} from "../db/db";
import {SQLFileManager} from "../db/sql";
import {UserRegister} from "../types/user";

export async function registerUser(db: PostgresClient, sql: SQLFileManager, userData: UserRegister) {
    const data = [userData.name, userData.mail, userData.password]

    await db.execute(sql.getSQLStatement("registerUser.sql"), data)
}