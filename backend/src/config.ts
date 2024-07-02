import dotenv from "dotenv";
import fs from "node:fs";
import {SSLObjectType} from "./db/db";

export class BackendConfig {
    private readonly _env_path: string

    public constructor(env_path: string = "../.env") {
        this._env_path = env_path;

        dotenv.config({ path: this._env_path });
    }

    public loadSSLObject(path: string = "../ca.pem"): SSLObjectType {
        if(!fs.existsSync(path)) {
            throw Error("Can not find path."); // TODO log
        }

        if(fs.lstatSync(path).isDirectory()) {
            throw Error("Unable to read file."); // TODO log
        }

        return {
            rejectUnauthorized: true,
            ca: fs.readFileSync(path).toString()
        }
    }

    public loadHost(): string {
        const host = process.env.SERVER_HOST

        if(host === undefined) {
            throw Error("Undefined server host.")
        }

        return host
    }

    public loadPort(): number {
        const port = process.env.PORT

        if(port === undefined) {
            throw Error("Undefined server port.")
        }

        return parseInt(port)
    }
}