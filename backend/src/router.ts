import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import {registerUser, getUserProjects, getUserTasks} from "./controllers/user";
import {UserRegister, requestUserId} from "./types/user";

export function createRouter(db: PostgresClient, sql: SQLFileManager) {
    const router = new Router();

    router.post("/api/register", (ctx) => {
        ctx.body = registerUser(db, sql, ctx.request.body as UserRegister)
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

    router.post("/api/getUserProjects", async (ctx) => {
       ctx.body = await getUserProjects(db, ctx.request.body as requestUserId)
    })

    router.post("/api/getUserTasks", async (ctx) => {
        ctx.body = await getUserTasks(db, ctx.request.body as requestUserId)
    })

    return router;
}