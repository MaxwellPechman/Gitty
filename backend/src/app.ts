import Koa from "koa";
import {createRouter} from "./router";
import cors from "@koa/cors";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";

export function createApp(db: PostgresClient, sql: SQLFileManager) {
    const app = new Koa()
    const router = createRouter(db, sql)

    app.use(cors())
    app.use(router.routes())
    app.use(router.allowedMethods())

    return app
}