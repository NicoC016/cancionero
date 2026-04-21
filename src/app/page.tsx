import { orderSongs } from "./utils/song.helper";
import { Song } from "@/models";
import Songs from "./songs/page";

export default async function Home() {
	const res = await fetch(`https://cancionero-sanpio.vercel.app/api/songs`);
  	const songs = await res.json();
  	const songsView:Song[] = orderSongs(songs);

  	return (
  	  	<div>
			<Songs songs={songsView}></Songs>
  	  	</div>
  	);
}
