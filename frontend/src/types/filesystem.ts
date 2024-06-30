export type FilesystemItem = {
    id: number;
    name: string;
    isDir: boolean;
    parentDir: number | null;
    children?: FilesystemItem[];
    file_content?: string;
}