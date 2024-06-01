import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import {registerUser, getUserProjects, getUserTasks} from "./controllers/user";
import {UserRegister, requestId} from "./types/user";
import {getTypes} from "./controllers/types";
import {newProject} from "./types/project";
import {createProject} from "./controllers/projects";

export async function createRouter(db: PostgresClient, sql: SQLFileManager) {
    const router = new Router();

    router.post("/api/register", async (ctx) => {
        ctx.body = await registerUser(db, sql, ctx.request.body as UserRegister)
    })

    router.post("/api/login", (ctx) => {
        ctx.body = "logined"
    })

    router.post("/api/getUserProjects", async (ctx) => {
       ctx.body = await getUserProjects(db, sql, ctx.request.body as requestId)
    })

    router.post("/api/getUserTasks", async (ctx) => {
        ctx.body = await getUserTasks(db, ctx.request.body as requestId)
    })

    router.post("/api/getTypes", async (ctx) => {
        ctx.body = await getTypes(db, sql, ctx.request.body as requestId)
    })

    router.post("/api/createProject", async (ctx) => {
        ctx.body = await createProject(db, sql, ctx.request.body as newProject)
    })
    return router;
}