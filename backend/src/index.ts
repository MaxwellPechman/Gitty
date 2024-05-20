import {createApp} from "./app";
import {BackendConfig} from "./config";
import {PostgresClient, SSLObjectType} from "./db/db";

export async function createDatabaseTables(client: PostgresClient) {
    await client.execute(`
        CREATE TABLE IF NOT EXISTS users (
            uid SERIAL PRIMARY KEY,
            username VARCHAR(16) NOT NULL,
            mail VARCHAR(128) NOT NULL,
            password VARCHAR(32) NOT NULL,
            date_created DATE NOT NULL,
            date_changed DATE NOT NULL,
            active BOOLEAN NOT NULL
        );
    `)

    await client.execute(`
    CREATE TABLE IF NOT EXISTS projects (
        pid SERIAL PRIMARY KEY,
        project_name Varchar(128) NOT NULL,
        description TEXT,
        date_created DATE NOT NULL,
        date_changed DATE NOT NULL,
        active BOOLEAN NOT NULL
        );`
    )

    await client.execute(`
    CREATE TABLE IF NOT EXISTS ProjectUsers (
        pid INTEGER REFERENCES projects (pid),
        uid INTEGER REFERENCES users (uid),
        owner BOOLEAN NOT NULL
        );
    `)
}

export function runApp() {
    const app = createApp()
    const config = new BackendConfig()
    const ssl: SSLObjectType = {
        rejectUnauthorized: true,
        ca: config.loadDBCertificate()
    }
    const pgClient = new PostgresClient(ssl)

    createDatabaseTables(pgClient).catch((err) => {
        console.error("nope", err)
    })

    app.listen(config.loadPort(), config.loadHost(),() => {
        console.log("Server is running.")
    })
}

runApp()