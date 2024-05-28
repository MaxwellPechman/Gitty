import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import {registerUser} from "./controllers/user";
import {UserRegister} from "./types/user";

export function createRouter(db: PostgresClient, sql: SQLFileManager) {
    const router = new Router();

    router.post("/api/register", (ctx) => {
        registerUser(db, sql, ctx.request.body as UserRegister)
            .then(() => {
                ctx.body = "registered"
            })
            .catch((err) => {
                ctx.body = "error"
                console.log(err);
        })
    })

    router.post("/api/login", (ctx) => {
        ctx.body = "logined"
    })

    return router;
}