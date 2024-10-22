import ShowListSong from "./songs/showListSong/showListSong";
import { orderSongs } from "./utils/song.helper";

export default async function Home() {
  const res = await fetch(`https://cancionero-beryl.vercel.app/api/songs`);
  const songs = await res.json();
  const songsView = orderSongs(songs);
  return (
    <div>
      <h1 className="text-lg text-center mb-5 pt-3">Canciones:</h1>
       <ShowListSong songsfind= {songsView}></ShowListSong>
    </div>
  );
}
