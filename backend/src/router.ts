import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import {registerUser, getUserProjects, getUserTasks, loginUser} from "./controllers/user";
import {UserRegister, requestId, UserLogin} from "./types/user";
import {getTypes} from "./controllers/types";
import {newProject, newTask} from "./types/project";
import {createProject, getProjectById} from "./controllers/projects";
import {createTask} from "./controllers/task";
import {getProfileData} from "./controllers/profile";
import {SessionRequest} from "./types/session";
import {fetchDirectories} from "./controllers/filesystem";

export async function createRouter(db: PostgresClient, sql: SQLFileManager) {
    const router = new Router();

    router.post("/api/register", async (ctx) => {
        ctx.body = await registerUser(db, sql, ctx.request.body as UserRegister)
    })

    router.post("/api/login", async (ctx) => {
        ctx.body = await loginUser(db, sql, ctx.request.body as UserLogin)
    })

    router.post("/api/getUserProfile", async (ctx) => {
        ctx.body = await getProfileData(db, sql, ctx.request.body as SessionRequest)
    })

    router.post("/api/getUserProjects", async (ctx) => {
       ctx.body = await getUserProjects(db, sql, ctx.request.body as requestId)
    })

    router.post("/api/getUserTasks", async (ctx) => {
        ctx.body = await getUserTasks(db, sql, ctx.request.body as requestId)
    })

    router.get("/api/getTypes", async (ctx) => {
        ctx.body = await getTypes(db, sql)
    })

    router.post("/api/createProject", async (ctx) => {
        ctx.body = await createProject(db, sql, ctx.request.body as newProject)
    })

    router.post("/api/createTask", async (ctx) => {
        ctx.body = await createTask(db, sql, ctx.request.body as newTask)
    })

    router.post("/api/getProjectById", async (ctx) => {
        ctx.body = await getProjectById(db, sql, ctx.request.body as requestId)
    })

    router.post("/api/getFileSystem", async (ctx) => {
        ctx.body = await fetchDirectories(db, sql, ctx.request.body as requestId)
    })

    return router;
}