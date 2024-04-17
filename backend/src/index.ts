import Koa from "koa"
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
    ctx.body = "Hello World!";
})

router.get("/test", (ctx, next) => {
    ctx.body = "this is a test.";
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3333, () => {
    console.log("Server started on localhost:3333");
})