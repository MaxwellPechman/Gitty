import { PostgresClient } from "../db/db";
import { SQLFileManager } from "../db/sql";
import { FilesystemItem } from "../types/filesystem";
import { requestId } from "../types/user";

export async function fetchDirectories(db: PostgresClient, sql: SQLFileManager, pid: requestId) {
    try {
        const directories = await fetchDirectoriesFromDB(db, sql, pid["id"]);
        return buildDirectoryHierarchy(directories);

    } catch (error) {
        console.error('Error fetching directories:', error);
        throw error;
    }
}

async function fetchDirectoriesFromDB(db: PostgresClient, sql: SQLFileManager, pid: number): Promise<FilesystemItem[]> {
    try {
        const directoriesQuery = await db.query(sql.getSQLStatement("selectDirectories.sql"), [pid]);
        const filesQuery = await db.query(sql.getSQLStatement("selectFiles.sql"), [pid]);
        const directories: FilesystemItem[] = directoriesQuery.map((row: any) => ({
                id: row.id,
                name: row.name,
                isDir: true,
                parentDir: row.parentdir !== undefined ? row.parentdir : null,
                children: [],
            }));
        const files: FilesystemItem[] = filesQuery.map((row: any) => ({
            id: row.fid,
            name: row.file_name,
            isDir: false,
            parentDir: row.file_parentdir,
            file_pid: row.file_pid,
            file_content: row.file_content
        }));

        directories.forEach(directory => {
            directory.children = files.filter(file => file.parentDir === directory.id);
        });

        return directories;

    } catch (error) {
        console.error('Error fetching directories and files from DB:', error); // TODO logging
        throw error;
    }
}

function buildDirectoryHierarchy(directories: FilesystemItem[]): FilesystemItem[] {
    const rootDirectories: FilesystemItem[] = [];
    const directoriesCopy = [...directories];

    directoriesCopy.forEach(directory => {
        if (directory.parentDir === null) {
            rootDirectories.push(directory);

        } else {
            const parentDirectory = directoriesCopy.find(d => d.id === directory.parentDir);

            if (parentDirectory) {
                if (!parentDirectory.children) {
                    parentDirectory.children = [];
                }

                parentDirectory.children.push(directory);
            }
        }
    });

    return rootDirectories;
}

export async function createFolder(db: PostgresClient, sql: SQLFileManager, pid: number, parentDir: number, dirName: string) {
    return await db.execute(sql.getSQLStatement("createFolder.sql"), [pid, parentDir, dirName]);
}

export async function uploadFile(db: PostgresClient, sql: SQLFileManager, pid: number, parentDir: number, fileName: string, fileContent: string) {
    return await db.execute(sql.getSQLStatement("uploadFile.sql"), [pid, parentDir, fileName, fileContent]);
}