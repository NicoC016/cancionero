"use client";
import { decodeName, subtitleOrder } from "@/app/utils/song.helper";
import { Song } from "@/models";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
/* eslint-disable */
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

  const songsGroupedBySubtitle = songsfind.reduce((songList, song, index) => {
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
        <div className="w-full flex-col flex gap-2">
          {subtitleOrder.map((subtitle) =>
            songsGroupedBySubtitle[subtitle] ? (
              <div key={subtitle}>
                {showSubtitle && (
                  <h3 className="text-lg font-semibold mb-2 ml-2 capitalize">
                    {subtitle}
                  </h3>
                )}
                {songsGroupedBySubtitle[subtitle].map((song) => (
                  <div
                    className="group relative"
                    key={song.id}
                    onClick={() => {
                      setOpen(true);
                      setSongFilter(song);
                    }}
                  >
                    <div className="flex justify-between items-center lg:px-3.5 py-2 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg lg:aspect-none group-hover:bg-gray-800 lg:h-16">
                      <div>
                        <span className="text-base max-sm:text-sm">
                          {globalIndex ++}-{" "}
                        </span>
                        <span className="capitalize text-base max-sm:text-sm">
                          {decodeName(song?.name)}
                        </span>
                      </div>
                      <div>
                        <small className="font-thin">
                          Tono: {song.note} - {song.description}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
        <Dialog
          open={open}
          onClose={setOpen}
          className="relative z-10 text-white"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className=" bg-gray-800 flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <DialogPanel
                transition
                className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
              >
                <div className="flex-col relative flex w-full items-center overflow-hidden bg-gray-600 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-md">
                  <div className="h-20 w-full">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="z-10 absolute right-4 top-4 text-gray-400 hover:text-gray-500 mb-5"
                    >
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                    <div className="absolute capitalize text-xl w-full right-0 text-center top-4 text-white mb-5">
                      <span>{decodeName(songSelect?.name)}</span>
                      <br />
                      <small>{decodeName(songSelect?.interpreter)}</small>
                      <br />
                      <span className="font-thin text-sm">
                        {songSelect?.capo !== "No"
                          ? `Capo: ${songSelect?.capo}`
                          : null}
                      </span>
                      <hr />
                    </div>
                  </div>
                  <div
                    className="w-full h-full flex justify-center mb-8"
                    dangerouslySetInnerHTML={{ __html: songSelect?.letter }}
                  ></div>
                  <div className="border-t-2 absolute bottom-0 flex justify-between w-full left-0 p-3">
                    <span>Tono: {songSelect?.note}</span>
                    <span>
                      {songSelect?.description} - {songSelect?.id}
                    </span>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ShowListSong;
