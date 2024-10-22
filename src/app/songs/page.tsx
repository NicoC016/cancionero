"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShowListSong from "./showListSong/showListSong";
import { Song } from "@/models";
import Loading from "@/shared/loading";


function Songs() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [songsFind, setFongsFind] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        fetch(`192.168.1.45:3000/api/songs/${query}`)
        .then(response => response.json())
        .then((res:any)=>{
            setFongsFind(res);
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            console.info(err);
            
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

export default Songs;
