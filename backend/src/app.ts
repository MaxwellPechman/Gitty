import Koa from "koa";
import {createRouter} from "./router";
import cors from "@koa/cors";

export function createApp() {
    const app = new Koa()
    const router = createRouter()

    app.use(cors())
    app.use(router.routes())
    app.use(router.allowedMethods())

    return app
}