import {createApp} from "../src/app";
import {PostgresClient} from "../src/db/db";
import {BackendConfig} from "../src/config";
import {SQLFileManager} from "../src/db/sql";

export default createApp(new PostgresClient(new BackendConfig().loadSSLObject()), new SQLFileManager())