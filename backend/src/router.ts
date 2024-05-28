import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";

export function createRouter(db: PostgresClient, sql: SQLFileManager) {
    const router = new Router();

    router.post("/api/register", (ctx) => {
        console.log(ctx.body)

        ctx.body = "registered"
    })

    router.post("/api/login", (ctx) => {
        ctx.body = "logined"
    })

    return router;
}