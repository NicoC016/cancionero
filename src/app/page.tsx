"use client"

import { Song } from "@/models";
import Songs from "./songs/page";
import { orderSongs } from "./utils/song.helper";
import { useEffect, useState } from "react";
import { getSongsFromCache, saveSongsToCache } from "./services/localstorage";

export default function Home() {
	const [songs, setSongs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
 	useEffect(() => {
    	async function load() {
      		const cached = getSongsFromCache()

      		if (cached) {
			  	const songsView: Song[] = orderSongs(cached);
      		  	setSongs(songsView);
				setLoading(false);
      		  return;
      		}

      		try {
	  			const res = await fetch(`https://cancionero-sanpio.vercel.app/api/songs`);
	  			const data = await res.json();
				const songsView: Song[] = orderSongs(data);
      		  	setSongs(songsView);
      		  	saveSongsToCache(data);
      		} catch (err) {
      		  	console.error("Error cargando canciones", err);
      		} finally {
				setLoading(false);
			}
    	}

    	load();
  	}, []);
//   const songs: Song[] = [
//     {
//       name: "Vivir amando",
//       capo: "no",
//       description: "Alabanzas",
//       note: "A",
//       interpreter: "Manuel Lorca",
//       id: 245,
//       letter: "",
//       createdAt: "",
//       link: "",
//       structure:
//         {
//           sections: [
//             {
// 				type:'verse',
//               	lines: [
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: [""],
//                 	      chords: ["LA", "LA", "MI", "DO#m", "LA", "SI"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Ojalá tuviera más que darte"],
//                 	      chords: ["MI", "LA"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["pero solo mi vida tengo."],
//                 	      chords: ["DO#m", "SI"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Y ya no, pues es tuya para Ti."],
//                 	      chords: ["LA", "LAm", "MI", "DO#m"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Vívela Tú, pues es tuya para Ti."],
//                 	      chords: ["FA#m", "SI", "MI"],
//                 	    },
//                 	  ],
//                 	},
//               	],
//             },
// 			{
// 				type:"bridge",
// 				lines:[
// 					{
//                 	  fragments: [
//                 	    {
//                 	      text: ["No es mas fácil porque sufro."],
//                 	      chords: ["LA", "MI"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Es mas fácil porque soy feliz."],
//                 	      chords: ["FA#m", "SI"],
//                 	    },
//                 	  ],
//                 	},
// 				]
// 			},
// 			{
// 				type:"chorus",
// 				lines:[
// 					{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Si viviré hasta morir,"],
//                 	      chords: ["MI", "DO#m"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["quiero vivir amando."],
//                 	      chords: ["LA","SI"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Hasta morir, de amor"],
//                 	      chords: ["SOL#m", "LA"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["y eternamente amar."],
//                 	      chords: ["RE", "SI", "MI"],
//                 	    },
//                 	  ],
//                 	},
// 				]
// 			},
//             {
// 				type:'verse',
//               	lines: [
//                 {
//                   fragments: [
//                     {
//                       text: [""],
//                       chords: ["DO#m", "LA", "SI"],
//                     },
//                   ],
//                 },
//                 {
//                   fragments: [
//                     {
//                       text: ["¿Cómo responder a tanto amor?"],
//                       chords: ["MI", "LA"],
//                     },
//                   ],
//                 },
//                 {
//                   fragments: [
//                     {
//                       text: ["Sino con mi pequeño corazón"],
//                       chords: ["DO#m", "SI"],
//                     },
//                   ],
//                 },
//                 {
//                   fragments: [
//                     {
//                       text: ["que no quiere latir sino para Ti."],
//                       chords: ["LA", "LAm", "MI", "DO#m"],
//                     },
//                   ],
//                 },
//                 {
//                   fragments: [
//                     {
//                       text: ["Pues yo soy para mi amado y mi amado"],
//                       chords: ["LA", "SI"],
//                     },
//                   ],
//                 },
//                 {
//                   fragments: [
//                     {
//                       text: ["es para mi."],
//                       chords: ["MI"],
//                     },
//                   ],
//                 },
//               ],
//             },
// 			{
// 				type:"bridge",
// 				lines:[
// 					{
//                 	  fragments: [
//                 	    {
//                 	      text: ["No es mas fácil, debo hacerme pequeño."],
//                 	      chords: ["LA", "MI"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Es mas fácil, solo aquí yo soy pleno."],
//                 	      chords: ["FA#m", "SI"],
//                 	    },
//                 	  ],
//                 	},
// 				]
// 			},
// 			{
// 				type:"chorus",
// 				lines:[
// 					{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Si viviré hasta morir,"],
//                 	      chords: ["MI", "DO#m"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["quiero vivir amando"],
//                 	      chords: ["LA", "SI"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Hasta morir, de amor"],
//                 	      chords: ["SOL#m", "LA"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["Vivir amando hasta morir de amor"],
//                 	      chords: ["SI", "LA"],
//                 	    },
//                 	  ],
//                 	},
//                 	{
//                 	  fragments: [
//                 	    {
//                 	      text: ["y eternamente amar."],
//                 	      chords: ["RE", "SI", "MI"],
//                 	    },
//                 	  ],
//                 	},
// 				]
// 			},
//           ],
//         },
    
//     },
//   ];

  return (
	  <div>
    	{!loading ? (
			<Songs songs={songs}></Songs>
    	): (
			<p>Cargando...</p>
		)}
	</div>
  );
}
