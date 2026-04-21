"use client";
import { decodeName, getIcon, subtitleOrder } from "@/app/utils/song.helper";
import { Song } from "@/models";
import Icons from "@/shared/getIcons";
import { SongModal } from "@/shared/modal";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const ShowListSong = ({
  songsfind,
  showSubtitle = false,
}: {
  songsfind: Song[];
  showSubtitle?: boolean;
}) => {
  const [songSelect, setSongFilter] = useState<Song | any>();
  const [open, setOpen] = useState(false);
  let globalIndex = 1;


  const handleSongClick = (song: Song) => {
    setSongFilter(song)
    setOpen(true)
  }

  const songsGroupedBySubtitle = songsfind.reduce((songList, song) => {
    const descriptionSong = song.description || "Otros";
    if (!songList[descriptionSong]) {
      songList[descriptionSong] = [];
    }
    songList[descriptionSong].push(song);
    return songList;
  }, {} as { [key: string]: Song[] });

  return (
    <>
      <div className="max-md:p-5 max-sm:p-1">
        <div className="w-full flex-col flex gap-6">
          {subtitleOrder.map((subtitle) =>
            songsGroupedBySubtitle[subtitle.name] ? (
              <div key={subtitle.name}>
                {showSubtitle && (
                  <section className="mb-8 headerScroll" id={subtitle.name.toLowerCase().replaceAll(' ', '_')}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icons icon={subtitle.icon} name={subtitle.name}/>
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">{subtitle.name}</h2>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {songsGroupedBySubtitle[subtitle.name].length} canciones
                      </span>
                    </div>
                  </section>
                )}
                <div className="gap-2 w-full flex-col flex">
                  {songsGroupedBySubtitle[subtitle.name].map((song) => (
                    <div
                      className="group relative gap-2"
                      key={song.id}
                      onClick={() => {
                        setOpen(true);
                        handleSongClick(song);
                      }}
                    >
                      <div className="group relative bg-card rounded-xl p-4 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                            {globalIndex ++}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="capitalize font-medium text-card-foreground truncate group-hover:text-primary transition-colors">
                              {decodeName(song?.name)}
                            </h3>
                            <p className="text-sm text-muted-foreground">{subtitle.name}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                              <MusicalNoteIcon className="w-3.5 h-3.5" />
                              {song.note}
                            </span>
                            {/* <button className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all hover:scale-110">
                              <PlayIcon className="w-4 h-4 ml-0.5" />
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
        <SongModal
          song={songSelect}
          isOpen={open}
          onClose={() => setOpen(false)}
      />
      </div>
    </>
  );
};

export default ShowListSong;
