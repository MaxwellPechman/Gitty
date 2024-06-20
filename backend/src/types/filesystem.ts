export type FilesystemItem = {
    id: number;
    name: string;
    folder: boolean;
    parent_id?: number;
    children?: FilesystemItem[];
    file_content?: string;
}