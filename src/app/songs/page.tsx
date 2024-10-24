"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShowListSong from "./showListSong/showListSong";
import { Song } from "@/models";
import Loading from "@/shared/loading";

/* eslint-disable */
function Songs() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [songsFind, setFongsFind] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        if(!query){return}
            fetch(`https://cancionero-sanpio.vercel.app/api/songs/${query}`)
            .then(response => response.json())
            .then((res:any)=>{
                setFongsFind(res);
                setLoading(false);
            })
            .catch(err=>{
                setLoading(false);
            })
    }, [])

    return (
        <>
            {loading ? (
                <Loading loading={loading}></Loading>
            ):(
                <div className="p-10">
                    {songsFind.length > 0 ? (
                        <div>
                            <h1 className="text-center w-full underline decoration-white font-semibold p-5">Se encontraron las siguientes canciones: </h1>
                            <ShowListSong songsfind= {songsFind}></ShowListSong>
                        </div>
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>

            )}
            
        </>
    );
}
/* eslint-enable */

export default Songs;
