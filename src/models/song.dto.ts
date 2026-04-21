export interface Song{
    id: number;
    name: string;
    letter: string;
    note: string;
    interpreter: string;
    capo: string | null;
    structure:{};
    description: string | undefined;
    createdAt: string;
}