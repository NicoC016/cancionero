"use client"

import { MusicalNoteIcon, UserIcon, BookOpenIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon, XMarkIcon, ChevronDoubleLeftIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { decodeName } from "@/app/utils/song.helper";
import ReactPlayer from "react-player";
import SongsInfo from "@/app/songs/songInfo/page";
import { transposeChord } from "@/app/utils/transport-note";
import { Button } from "@/shared/ui/button";
import { getSongsFromCache } from "@/app/services/localstorage";
import { Song } from "@/models";
import { Modal } from "@/shared/modal";



export default function SongDetail({ id }: {id:number}) {

    const [showChords, setShowChords] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [open, setOpen] = useState(false);
    const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
    const [showVideo, setShowVideo] = useState(false);
    const [playerKey, setPlayerKey] = useState(0);
    const [transpose, setTranspose] = useState(0);
    const [counterTranspose, setCounterTranspose] = useState(0);
    const [showMenu, setShowMenu] = useState<boolean>(false);
	const [song, setSong] = useState<Song>();

    const setValueTranspose = (type:string) => {
        if(type === "suma"){
            if(counterTranspose + 0.5 === 6 && type === "suma"){
                setCounterTranspose(0);
                return setTranspose(0);
            }
            setCounterTranspose(counterTranspose+ 0.5);
            return setTranspose(transpose +1);

        }

		if(counterTranspose - 0.5 === -6 && type === "resta"){
			setCounterTranspose(0);
            return setTranspose(0);
		}
        setCounterTranspose(counterTranspose- 0.5);
        setTranspose(transpose -1);
    }

    const play = () => {
        setIsPlaying(!isPlaying);
        setShowVideo(true);
    };
    const pause = () => {
        setIsPlaying(!isPlaying)
    };
    const restart = () => {
        setPlayerKey((prev) => prev + 1);
    };

    const closeVideo = () => {
        setIsPlaying(false);
        setShowVideo(false);
    };

    const openMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const songs = getSongsFromCache();
	    return setSong(songs.find((song:Song) => song.id === id));
    },[])

    if (!song) return null;

  return (
    <div className="flex flex-col mx-auto px-4 py-4 max-w-6xl">
        <div className="border-b border-border pb-4">
            <div className="flex items-start md:max-w-6xl justify-between gap-4">
                <div>
                  	<h1 className="capitalize text-primary font-serif text-4xl mb-2 ">
                    	{decodeName(song?.name)}
                  	</h1>
                  	<div className="flex justify-between items-center gap-48">
                    	<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    	  	<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    	  	  	<MusicalNoteIcon className="w-3.5 h-3.5" />
                    	  	  	Tono: {transposeChord(song.note, transpose)}
								<section className="flex md:hidden gap-2 justify-center items-center">
                    	  	  	  	<span role="button" className="flex justify-center items-center ml-5 p-0.5 border border-gray-700 rounded-full" onClick={()=> setValueTranspose("suma")}>
                    	  	  	  	  	<ArrowUpIcon className="w-3.5 h-3.5"/>
                    	  	  	  	</span>
                    	  	  	  	<span>{counterTranspose}</span>
                    	  	  	  	<span role="button" className="border border-gray-700 p-0.5 rounded-full" onClick={()=> setValueTranspose('resta')}>
                    	  	  	  	  	<ArrowDownIcon className="w-3.5 h-3.5"/>
                    	  	  	  	</span>
                    	  	  	</section>
                    	  	</span>
                    	  	<span className="inline-flex items-center gap-1.5">
                    	  	  	<BookOpenIcon className="w-4 h-4" />
                    	  	  	{song.description}
                    	  	</span>
                    	  	{song.interpreter && (
                    	  	  	<span className="inline-flex items-center gap-1.5">
                    	  	  	  	<UserIcon className="w-4 h-4" />
                    	  	  	  	{decodeName(song?.interpreter)}
                    	  	  	</span>
                    	  	)}
                    	  	{song.capo && (
                    	  	  	<span className="inline-flex items-center gap-1.5">
                    	  	    	<span>Capo: </span>
                    	  	    	{song.capo}
                    	  	  	</span>
                    	  	)}
                    	</div>
                  	</div>
                </div>
            </div>
            {
                song?.link? (
                    <div className="hidden md:block mt-4 pt-4 border-t border-border">
                        <div className="flex items-start gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {isPlaying? pause(): play()}}
                            className="gap-2"
                          >
                            {isPlaying ? (
                              <>
                                <PauseIcon className="w-4 h-4" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <PlayIcon className="w-4 h-4" />
                                Escuchar
                              </>
                            )}
                          </Button>
                          {isPlaying? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => restart()}
                              className="gap-2 ml-2">
                              <>
                                  <ChevronDoubleLeftIcon className="w-4 h-4" />
                                  Volver a empezar
                                </>
                            </Button>
                          ):(
                            <div></div>
                          )}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )
            }
            <div>
                {showVideo? (
                    <div>
                        <span className="w-4 h-4 absolute right-2 -mt-6.25">
                            <XMarkIcon onClick={()=> closeVideo()}/>
                        </span>
                        <ReactPlayer
                          	key={playerKey}
                          	src={song.link}
                          	playing={isPlaying}
                          	controls={false}
                          	width="100"
                          	height="100"
                        />
                    </div>
                ):(
                  <span></span>
                )}
            </div>
        </div>

		<div className="flex justify-start gap-10 md:py-6">
			<div className="hidden md:flex flex-col mt-3 gap-2">
				<Button
					variant={showChords ? "default" : "outline"}
					size="lg"
					onClick={() => setShowChords(!showChords)}
					className="gap-2"
				>
					<MusicalNoteIcon className="w-4 h-4" />
					Acordes
				</Button>
				<Button
					variant="outline"
					size="lg"
					onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")}
					className="gap-2"
				>
					{fontSize === "normal" ? (
						<>
							<ArrowsPointingOutIcon className="w-4 h-4" />
							Agrandar
						</>
					) : (
						<>
							<ArrowsPointingInIcon className="w-4 h-4" />
							Reducir
						</>
				)}
				</Button>
				<span className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs dark:bg-input/30 dark:border-input h-10 rounded-md has-[>svg]:px-4">
					<section className="flex gap-2 justify-center items-center">
                	  	<span role="button" className="h-10 rounded-bl-md rounded-tl-md px-6 has-[>svg]:px-4 dark:hover:bg-input/50 hover:bg-accent hover:text-accent-foreground flex justify-between items-center border-r border-border" onClick={()=> setValueTranspose("suma")}>
                	  	  	<ArrowUpIcon className="w-3.5 h-3.5"/>
                	  	</span>
                	  	<span className="text-center w-5">{counterTranspose}</span>
                	  	<span role="button" className="h-10 rounded-br-md rounded-tr-md px-6 has-[>svg]:px-4 dark:hover:bg-input/50 hover:bg-accent hover:text-accent-foreground border-l border-border flex justify-between items-center" onClick={()=> setValueTranspose('resta')}>
                	  	  	<ArrowDownIcon className="w-3.5 h-3.5"/>
                	  	</span>
                	</section>
				</span>
			</div>
			<div className="flex-1 overflow-y-auto px-1">
				<div className={`md:space-y-6 ${fontSize === "large" ? "text-lg" : "text-base"}`}>
					<SongsInfo song={song} showChords={showChords} transpose={transpose}/>
				</div>
			</div>
		</div>
        <div className="md:hidden shrink-0 border-t border-border pt-4 mt-auto">
            <Button onClick={()=> openMenu()}>
                {!showMenu ? 'Herramientas' : 'Cerrar'}
            </Button>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={'Herramientas'}
                children={
                    <div className="shrink-0 pt-4 mt-auto">
                        <div className="flex flex-col mt-3 gap-2">
							<label className="flex items-center justify-between cursor-pointer">
							  	<span className="text-md font-medium">
							  	  	Mostrar acordes
							  	</span>
							  	<div className="relative">
							  	  	<input type="checkbox" onClick={() => setShowChords(!showChords)} className="sr-only peer"/>
							  	  	<div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
							  	  	<div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></div>
							  	</div>
							</label>
							<label className="flex items-center justify-between cursor-pointer">
							  	<span className="text-md font-medium">
							  	  	Aumentar letra
							  	</span>
							  	<div className="relative">
							  	  	<input type="checkbox" onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")} className="sr-only peer"/>
							  	  	<div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
							  	  	<div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></div>
							  	</div>
							</label>
                        </div>
                        <div>
                            {
                                song?.link? (
                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                                        <div className="flex">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {isPlaying? pause(): play()}}
                                            className="gap-2"
                                          >
                                            {isPlaying ? (
                                              <>
                                                <PauseIcon className="w-4 h-4" />
                                                Pausar
                                              </>
                                            ) : (
                                              <>
                                                <PlayIcon className="w-4 h-4" />
                                                Escuchar
                                              </>
                                            )}
                                          </Button>
                                          {isPlaying? (
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => restart()}
                                              className="gap-2 ml-2">
                                              <>
                                                  <ChevronDoubleLeftIcon className="w-4 h-4" />
                                                  Volver a empezar
                                                </>
                                            </Button>
                                          ):(
                                            <div></div>
                                          )}
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                    </div>
                }
            />
            {/* {showMenu ? (
                <div className="shrink-0 pt-4 mt-auto">
                    <div className="flex mt-3 gap-2">
                        <Button
                            variant={showChords ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowChords(!showChords)}
                            className="gap-2"
                        >
                            <MusicalNoteIcon className="w-4 h-4" />
                            Acordes
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")}
                            className="gap-2"
                        >
                            {fontSize === "normal" ? (
                                <>
                                    <ArrowsPointingOutIcon className="w-4 h-4" />
                                    Agrandar
                                </>
                            ) : (
                                <>
                                    <ArrowsPointingInIcon className="w-4 h-4" />
                                    Reducir
                                </>
                          )}
                        </Button>
                    </div>
                    <div>
                        {
                            song?.link? (
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                                    <div className="flex">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {isPlaying? pause(): play()}}
                                        className="gap-2"
                                      >
                                        {isPlaying ? (
                                          <>
                                            <PauseIcon className="w-4 h-4" />
                                            Pausar
                                          </>
                                        ) : (
                                          <>
                                            <PlayIcon className="w-4 h-4" />
                                            Escuchar
                                          </>
                                        )}
                                      </Button>
                                      {isPlaying? (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => restart()}
                                          className="gap-2 ml-2">
                                          <>
                                              <ChevronDoubleLeftIcon className="w-4 h-4" />
                                              Volver a empezar
                                            </>
                                        </Button>
                                      ):(
                                        <div></div>
                                      )}
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
            ):(
                <span></span>
            )} */}
        </div>
    </div>
  )
}
