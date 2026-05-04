"use client";
import { MouseEventHandler, useMemo, useState } from "react";
import ShowListSong from "./showListSong/showListSong";
import { Song } from "@/models";
import NavBar from "@/shared/navbar";
import { SunIcon } from "@heroicons/react/24/outline";
import { subtitleOrder } from "../utils/song.helper";
import Icons from "@/shared/getIcons";

interface HeaderProps {
  songs: Song[]
}


function Songs({songs}:HeaderProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const songsView:Song[] = useMemo(() => {
    	if (!searchQuery.trim()) return songs;
    	const query = searchQuery.toLowerCase()
    	return songs
    	  	.map((song) => ({
    	    	...song,
    	    	data: song.name.toLowerCase().includes(query) || song.note.toLowerCase().includes(query)? Array(song): []
    	  	}))
    	  	.filter((songs) => songs?.data?.length > 0)
  	}, [searchQuery]);

	const navigateTo = (title:string):any =>{
		const elementName = title.toLowerCase().replaceAll(' ', "_");
		const element = document.getElementById(elementName);
		if(element){
			return element?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}


    return (
        <>
            <NavBar searchQuery={searchQuery} onSearchChange={setSearchQuery}></NavBar>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                  	<h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                    	Cancionero Litúrgico
                  	</h1>
                  	<p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                    	Tu compañero para la música en cada celebración eucarística.
                    	Encuentra fácilmente las canciones organizadas por momento de la
                    	misa.
                  	</p>
                  	<div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    	<span className="flex items-center gap-2">
                      		<span className="w-2 h-2 rounded-full bg-primary"></span>
                      		{songsView?.length} canciones
                    	</span>
                    	<span className="flex items-center gap-2">
                      		<span className="w-2 h-2 rounded-full bg-accent"></span>
                   			{subtitleOrder?.length} secciones
                    	</span>
                  	</div>
                </div>
                <div className="mb-10 overflow-x-auto pb-2">
                  	<div className="flex gap-2 min-w-max">
                    	{subtitleOrder.map((section) => (
                      		<a
                        		key={section.name}
                        		onClick={()=> navigateTo(section.name)}
                        		className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      		>
                        		<Icons icon={section.icon} name={section.name}/>
                        		{section.name}
                      		</a>
                    	))}
                  	</div>
                </div>
		        {songsView?.length > 0 ? (
		        	<ShowListSong songsfind={songsView} showSubtitle={true}/>
		        ) : (
		        	<div className="text-center py-16">
                    	<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    	  <SunIcon className="w-8 h-8 text-muted-foreground" />
                    	</div>
                    	<h3 className="text-lg font-medium text-foreground mb-2">No se encontraron canciones</h3>
                    	<p className="text-muted-foreground">
                    	  Intenta buscar con otro término o revisa la ortografía
                    	</p>
                  	</div>
		        )}
            </main>
        </>
    );
}

export default Songs;
