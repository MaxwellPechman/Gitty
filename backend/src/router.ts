import Router from "koa-router";

export function createRouter() {
    const router = new Router();

    router.post("/api/register", (ctx) => {

        // erstmal nur testweise
        ctx.body = "registered"
    })

    router.post("/api/login", (ctx) => {
        ctx.body = "logined"
    })

    return router;
}