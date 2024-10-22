"use client"
import { decodeName } from "@/app/utils/song.helper";
import { Song } from "@/models";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Radio,
    RadioGroup,
  } from "@headlessui/react";
  import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const ShowListSong = ({songsfind}: {songsfind:Song[]}) => {
    const [songSelect, setSongFilter] = useState<Song | any>();
    const [open, setOpen] = useState(false);
  return (
    <>
        <div>
            <div className="w-full flex-col flex gap-2">
            {songsfind.length > 0 && (
                songsfind.map((song: Song, index: number) => (
                <div
                    className="group relative"
                    key={song.id}
                    onClick={() => {
                        setOpen(true);
                        setSongFilter(songsfind[index]);
                    }}
                >
                    <div className="flex justify-between items-center px-3.5 py-2 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg lg:aspect-none group-hover:bg-gray-800 lg:h-16">
                    <div>
                        <span>{index + 1}- </span>
                        <span className="capitalize">
                        {decodeName(song?.name)}
                        </span>
                    </div>
                    <span>Tono: {song.note}</span>
                    </div>
                </div>
                ))
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
              <div className="relative flex w-full items-center overflow-hidden bg-gray-600 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-md">
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="z-10 absolute right-4 top-4 text-gray-400 hover:text-gray-500 mb-5"
                  >
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                  <span className="absolute capitalize text-xl w-full right-0 text-center top-4 text-white mb-5">
                    {decodeName(songSelect?.name)}
                  </span>
                </div>
                <div className="w-full h-full flex justify-center mt-16"  dangerouslySetInnerHTML={{ __html: songSelect?.letter }}></div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
        </div>
    </>
  )
}

export default ShowListSong