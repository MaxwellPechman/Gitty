export type Directory = {
    id: number;
    name: string;
    folder: boolean;
    children?: Directory[];
}