"use client"
import { MusicalNoteIcon, UserIcon, BookOpenIcon, ClockIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/24/outline"
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { decodeName } from "@/app/utils/song.helper"
import { Song } from "@/models"


interface SongModalProps {
  song: Song | null
  isOpen: boolean
  onClose: () => void
}

export function SongModal({ song, isOpen, onClose }: SongModalProps) {
  const [showChords, setShowChords] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal")

  if (!song) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
                  Tono: {song.note}
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
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
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
                  Reproducir
                </>
              )}
            </Button> */}
            {/* <Button
              variant={showChords ? "default" : "outline"}
              size="sm"
              onClick={() => setShowChords(!showChords)}
              className="gap-2"
            >
              <MusicalNoteIcon className="w-4 h-4" />
              Acordes
            </Button> */}
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
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-6 px-1">
          <div className={`space-y-6 ${fontSize === "large" ? "text-lg" : "text-base"}`}>
            <section dangerouslySetInnerHTML={{ __html: song?.letter }}></section>
          </div>
        </div>

        <div className="shrink-0 border-t border-border pt-4 mt-auto">
          <p className="text-xs text-muted-foreground text-center">
            Usa las flechas del teclado para navegar entre canciones
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
