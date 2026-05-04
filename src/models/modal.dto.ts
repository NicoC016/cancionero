import { Song } from "./song.dto";


export interface SongModalProps {
    song: Song | null;
    isOpen: boolean;
    onClose: () => void;
}