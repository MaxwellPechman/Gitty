import dotenv from "dotenv";
import {convertStringPortToNumber, verifyHostAddressFormat} from "./utils/network";

export class BackendConfig {
    private readonly _env_path: string

    public constructor(env_path: string = "../.env") {
        this._env_path = env_path;

        dotenv.config({ path: this._env_path });
    }

    public loadHost(): string {
        const host = process.env.SERVER_HOST

        if(host === undefined) {
            throw Error("Undefined server host.")
        }

        return host
    }

    public loadPort(): number {
        const port = process.env.SERVER_PORT

        if(port === undefined) {
            throw Error("Undefined server port.")
        }

        return parseInt(port)
    }
}