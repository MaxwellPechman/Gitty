import Koa from "koa";
import {createRouter} from "./router";
import cors from "@koa/cors";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import bodyParser from "koa-bodyparser";

export async function createApp(db: PostgresClient, sql: SQLFileManager) {
    const app = new Koa()
    const router = await createRouter(db, sql)

    app.use(cors())
    app.use(bodyParser({textLimit: '999999999999999999999999999',
                             xmlLimit: '999999999999999999999999999',
                             formLimit: '999999999999999999999999999',
                             jsonLimit: '999999999999999999999999999'}))
    app.use(router.routes())
    app.use(router.allowedMethods())

    return app
}