import {createApp} from "./app";
import {BackendConfig} from "./config";
import {SQLFileManager} from "./db/sql";
import {PostgresClient} from "./db/db";

async function initializeDatabase(db: PostgresClient, sql: SQLFileManager) {
    await db.execute(sql.getSQLStatement("initialize.sql"))
}

async function runApp() {
    const config = new BackendConfig()
    const pg = new PostgresClient(config.loadSSLObject())
    const sql = new SQLFileManager()
    const app = await createApp(pg, sql)

    await initializeDatabase(pg, sql).catch((err) => {
        console.log("Unable to initialize database", err)
    })

    const server = app.listen(config.loadPort(),() => {
        console.log("Server is running.")
    })

    console.log(server.address())

    const shutdown = () => {
        server.close(() => {
            pg.dispose()
                .then(() => {
                    process.exit(0)
                })
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

runApp().catch((err) => {
    console.error("Error while starting Backend", err)
})

