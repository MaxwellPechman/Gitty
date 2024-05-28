import fs from "node:fs";

export type SQLFile = {
    name: string;
    content: string;
}

export class SQLFileManager {

    private readonly basePath: string
    private readonly sqlFiles: SQLFile[]

    constructor(path: string = "../sql/") {
        this.basePath = path
        this.sqlFiles = []

        this.loadFiles()
    }

    private loadFiles() {
        if(!fs.existsSync(this.basePath)) {
            throw Error("No SQL directory found."); // TODO log
        }

        if(!fs.lstatSync(this.basePath).isDirectory()) {
            throw Error("No SQL directory can not be a file."); // TODO log
        }

        fs.readdirSync(this.basePath).forEach(file => {
            this.sqlFiles.push({
                name: file,
                content: fs.readFileSync(this.basePath + file).toString()
            })
        })
    }

    public existsSQLStatement(statementName: string): boolean {
        for(let index = 0; index < this.sqlFiles.length; index++) {
            if(this.sqlFiles[index].name === statementName) {
                return true
            }
        }

        return false
    }

    public getSQLStatement(statementName: string): string {
        if(!this.existsSQLStatement(statementName)) {
            throw Error(`Cannot find SQL-Statement statement: ${statementName}`);
        }

        return this.sqlFiles.filter((file) => file.name === statementName)[0].content
    }
}