"use client"
import { MusicalNoteIcon, UserIcon, BookOpenIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon, XMarkIcon, ChevronDoubleLeftIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { decodeName } from "@/app/utils/song.helper";
import ReactPlayer from "react-player";
import SongsInfo from "@/app/songs/[song]/page";
import { SongModalProps } from "@/models/modal.dto";
import { transposeChord } from "@/app/utils/transport-note";



export function SongModal({ song, isOpen, onClose }: SongModalProps) {
    const [showChords, setShowChords] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
    const [showVideo, setShowVideo] = useState(false);
    const [playerKey, setPlayerKey] = useState(0);
    const [transpose, setTranspose] = useState(0);
    const [counterTranspose, setCounterTranspose] = useState(0);
    const [showMenu, setShowMenu] = useState<boolean>(false);


    const setValueTranspose = (type:string) => {

        if(type === "suma"){
            if(counterTranspose + 0.5 === 6 && type === "suma"){
                setCounterTranspose(0);
                return setTranspose(0);
            }
            setCounterTranspose(counterTranspose+ 0.5);
            return setTranspose(transpose +1);

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

    const closeModal = () =>{
        closeVideo();
        setTranspose(0);
        setCounterTranspose(0)
        onClose();
    }

    const openMenu = () => {
        setShowMenu(!showMenu)
    }

    if (!song) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {!open && closeModal()}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" aria-description={song.name} aria-describedby={song.name}>
        <DialogHeader className="shrink-0 border-b border-border pb-4">
            <div className="flex items-start justify-between gap-4 pr-8">
                <div>
                  <DialogTitle className="capitalize font-serif text-2xl text-foreground mb-2">
                    {decodeName(song?.name)}
                  </DialogTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      <MusicalNoteIcon className="w-3.5 h-3.5" />
                      Tono: {transposeChord(song.note, transpose)}
                      <section className="flex gap-2 justify-center items-center">
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
                    <div className="hidden md:flex mt-3 gap-2">
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
                  </div>
                </div>
            </div>
            {
                song?.link? (
                    <div className="hidden md:flex items-center gap-2 mt-4 pt-4 border-t border-border">
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
        </DialogHeader>

        <div className="flex-1 overflow-y-auto md:py-6 px-1">
          <div className={`md:space-y-6 ${fontSize === "large" ? "text-lg" : "text-base"}`}>
            <SongsInfo song={song} showChords={showChords} transpose={transpose}/>
          </div>
        </div>
        <div className="md:hidden shrink-0 border-t border-border pt-4 mt-auto">
            <Button onClick={()=> openMenu()}>
                {!showMenu ? 'Herramientas' : 'Cerrar'}
            </Button>
            {showMenu ? (
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
            )}
        </div>
        
      </DialogContent>
    </Dialog>
  )
}
