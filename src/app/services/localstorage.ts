import { Song } from "@prisma/client";


const CACHE_KEY = "songs_cache";
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;


export const saveSongsToCache = (songs:Song[]) => {
    const payload = {
        songs,
        expiry: Date.now() + TWO_WEEKS
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export const getSongsFromCache = ():any => {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);

        if (Date.now() > parsed.expiry) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

    return parsed.songs;
    } catch (error) {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }

}