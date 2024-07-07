import Router from "koa-router";
import {PostgresClient} from "./db/db";
import {SQLFileManager} from "./db/sql";
import {registerUser, getUserProjects, getUserTasks, loginUser} from "./controllers/user";
import {UserRegister, requestId, UserLogin} from "./types/user";
import {getTypes} from "./controllers/types";
import {newProject, newTask} from "./types/project";
import {createProject, getProjectById, getProjectTasks, updateProjectDescription} from "./controllers/projects";
import {createTask, getTaskById, updateTaskDescription, updateTaskStatus} from "./controllers/task";
import {getProfileData, uploadProfilePicture} from "./controllers/profile";
import {SessionRequest} from "./types/session";
import {createFolder, fetchDirectories, uploadFile} from "./controllers/filesystem";

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
       ctx.body = await getUserProjects(db, sql, ctx.request.body as {sid: string})
    })

    router.post("/api/getUserTasks", async (ctx) => {
        ctx.body = await getUserTasks(db, sql, ctx.request.body as { sid: string })
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

    router.post("/api/gettaskById", async (ctx) => {
        ctx.body = await getTaskById(db, sql, ctx.request.body as number)
    })

    router.post("/api/getFileSystem", async (ctx) => {
        ctx.body = await fetchDirectories(db, sql, ctx.request.body as requestId)
    })

    router.post("/api/createFolder", async (ctx) => {
        const data = ctx.request.body as [number, number, string]
        ctx.body = await createFolder(db, sql, data[0], data[1], data[2])
    })

    router.post("/api/getProjectTasks", async (ctx) => {
        const data = ctx.request.body as [number]
        ctx.body = await getProjectTasks(db, sql, data[0])
    })

    router.post("/api/updateTaskStatus", async (ctx) => {
        const data = ctx.request.body as [number, number]
        ctx.body = await updateTaskStatus(db, sql, data[0], data[1])
    })

    router.post("/api/uploadFile", async (ctx) => {
        const data = ctx.request.body as [number, number, string, string]
        ctx.body = await uploadFile(db, sql, data[0], data[1], data[2], data[3])
    })

    router.post("/api/uploadProfilePicture", async (ctx) => {
        const data = ctx.request.body as [string, string]
        ctx.body = await uploadProfilePicture(db, sql, data[0], data[1])
    })

    router.post("/api/updateProjectDescription", async (ctx) => {
        const data = ctx.request.body as [number, string]
        ctx.body = await updateProjectDescription(db, sql, data[0], data[1])
    })

    router.post("/api/updateTaskDescription", async (ctx) => {
        const data = ctx.request.body as [number, string]
        ctx.body = await updateTaskDescription(db, sql, data[0], data[1])
    })

    return router;
}