import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import {registerUser, getUserProjects, getUserTasks} from "./controllers/user";
import {UserRegister, requestId} from "./types/user";
import {getTypes} from "./controllers/types";
import {Project} from "./types/project";
import {createProject} from "./controllers/projects";

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

    router.post("/api/getUserProjects", async (ctx) => {
       ctx.body = await getUserProjects(db, ctx.request.body as requestId)
    })

    router.post("/api/getUserTasks", async (ctx) => {
        ctx.body = await getUserTasks(db, ctx.request.body as requestId)
    })

    router.post("/api/getTypes", async (ctx) => {
        ctx.body = await getTypes(db, ctx.request.body as requestId)
    })

    router.post("/api/createProject", (ctx) => {
        createProject(db, sql, ctx.request.body as Project)
            .then(() => {
                ctx.body = "create"
            })
            .catch((err) => {
                ctx.body = "error"
                console.log(err);
            })
    })
    return router;
}