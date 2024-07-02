export type FileElement = {
    id: number;
    name: string;
    isDir: boolean;
    parentDir: number | null;
    children?: FileElement[];
    file_content?: string;
}