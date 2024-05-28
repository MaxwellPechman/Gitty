import {Pool} from "pg";

export type SSLObjectType = {
    rejectUnauthorized: boolean;
    ca?: string
    key?: string
    cert?: string
}

export class PostgresClient {

    private readonly pool: Pool

    constructor(ssl?: SSLObjectType) {
        this.pool = new Pool({
            ssl: ssl
        })

        this.connect().catch((err) => {
            console.error(err) // should be logged
        })
    }

    private async connect(): Promise<void> {
        try {
            await this.pool.connect()

        } catch(exception) {
            if(exception instanceof SyntaxError) {
                // TODO: Error logging
                exception.stack
            }
        }
    }

    // use this if you execute a SQL statement and expect a result
    public async query(sql: string, value: any): Promise<any> {
        if(value === undefined || value === null) {
            throw Error("Undefined ")
        }

        try {
            const result = await this.pool.query(sql, value)

            return result.rows

        } catch(exception) {
            if(exception instanceof SyntaxError) {
                // TODO: Error logging
                exception.stack
            }
        }
    }

    // use this if you execute a SQL statement and expect no result
    public async execute(sql: string, value?: any) {
        this.pool.connect((err, client, release) => {
            if (err) {
                console.error('Error acquiring client', err.stack); // to be logged
                return
            }

            if(client === undefined) {
                throw Error("no client") // to be logged
            }

            if(value === undefined || value === null) {
                client.query(sql, (err) => {
                    if(err) {
                        console.error('Error acquiring client', err.stack); // to be logged
                    }
                })

            } else {
                client.query(sql, value, (err) => {
                    if(err) {
                        console.error('Error acquiring client', err.stack); // to be logged
                    }
                })
            }
        })
    }

    public async dispose() {
        try {
            await this.pool.end()

        } catch(exception) {
            if(exception instanceof SyntaxError) {
                // TODO: Error logging
                exception.stack
            }
        }
    }
}