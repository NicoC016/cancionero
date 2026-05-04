export interface Song{
    id: number;
    name: string;
    letter: string;
    note: string;
    interpreter: string;
    capo: string | null;
    structure?: SongStructure;
    link?:string | undefined;
    description: string | undefined;
    createdAt: string;
}