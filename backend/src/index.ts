import {createApp} from "./app";
import {BackendConfig} from "./config";

export function runApp() {
    const app = createApp()
    const config = new BackendConfig()

    app.listen(config.loadPort(), config.loadHost(),() => {
        console.log("Server is running.")
    })
}

runApp()