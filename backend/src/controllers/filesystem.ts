import { PostgresClient } from "../db/db";
import { SQLFileManager } from "../db/sql";
import { FilesystemItem } from "../types/filesystem";
import { requestId } from "../types/user";

export async function fetchDirectories(db: PostgresClient, sql: SQLFileManager, pid: requestId) {
    try {
        const directories = await fetchDirectoriesFromDB(db, sql, pid["id"]);
        const hierarchy = buildDirectoryHierarchy(directories);

        return hierarchy;
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
            folder: true,
            parent_id: row.parent_id !== undefined ? row.parent_id : null,
            children: [],
        }));

        const files: FilesystemItem[] = filesQuery.map((row: any) => ({
            id: row.fid,
            name: row.file_name,
            folder: false,
            parent_id: row.file_parentdir,
            file_pid: row.file_pid,
            file_content: row.file_content
        }));

        directories.forEach(directory => {
            directory.children = files.filter(file => file.parent_id === directory.id);
        });

        return directories;
    } catch (error) {
        console.error('Error fetching directories and files from DB:', error);
        throw error;
    }
}

function buildDirectoryHierarchy(directories: FilesystemItem[]): FilesystemItem[] {
    const rootDirectories: FilesystemItem[] = [];

    // Erstelle eine Kopie der Verzeichnisse
    const directoriesCopy = [...directories];

    // Baue die Hierarchie basierend auf der parent_id auf
    directoriesCopy.forEach(directory => {
        if (directory.parent_id === null) {
            rootDirectories.push(directory); // Füge Wurzelverzeichnis hinzu
        } else {
            const parentDirectory = directoriesCopy.find(d => d.id === directory.parent_id);
            if (parentDirectory) {
                if (!parentDirectory.children) {
                    parentDirectory.children = [];
                }
                parentDirectory.children.push(directory); // Füge das Verzeichnis als Kind hinzu
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