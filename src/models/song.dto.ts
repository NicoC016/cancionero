export interface Song{
    id: number;
    name: string;
    letter: string;
    note: string;
    interpreter: string;
    capo: string | null;
    description: string | null;
    createdAt: string;
}