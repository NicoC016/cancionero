import { Song } from "@/models";

export const decodeName = (name: string) => {
    const newName = name?.trim().replaceAll("-", " ");
    return newName;
};

export const orderSongs = (songs:Song[]) =>{
    const newArrSong = songs?.sort((x, z)=> x.name.localeCompare(z.name));
    return newArrSong;
}

export  const subtitleOrder = [
    "Entrada",
    "Acto penitencial",
    "Gloria",
    "Salmo",
    "Aleluya",
    "Ofrenda",
    "Santo",
    "Cordero",
    "Comunión",
    "Alabanzas",
    "Salida",
    "Cantos Marianos",
    "Cantos al espíritu santo",
    "Cantos de navidad",
    "Pascua",
    "Otros cantos",
];