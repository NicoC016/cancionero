import { Song } from "@/models";

export const decodeName = (name: string) => {
    const newName = name?.trim().replaceAll("-", " ");
    return newName;
};

export const orderSongs = (songs:Song[]) =>{
    const newArrSong = songs?.sort((x, z)=> x.name.localeCompare(z.name));
    return newArrSong;
}