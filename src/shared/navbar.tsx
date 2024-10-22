"use client"   
import { decodeName } from "@/app/utils/song.helper";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
export default function NavBar() {
  const router = useRouter();
  const [navigation, setNavigation] = useState([
    { name: "Canciones", href: "/", current: true },
    { name: "Acordes", href: "/chords", current: false },
  ]);
  const onSubmit = (e:Event | any) =>{
    e.preventDefault();
    const name = decodeName(e.target?.name.value); 
    return router.push(`/songs?query=${encodeURIComponent(name.trim().toLowerCase())}`);    
  }
  const handleClick = (href: string) => {
    setNavigation((prevNav) =>
      prevNav.map((item) => ({
        ...item,
        current: item.href === href,
      }))
    );
    router.push(href);
  };
  
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                src={"/images/nec-studio.png"}
                alt="Logo"
                className="h-8 w-auto"
                width={50}
                height={50}
              ></Image>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(event)=>{
                      event.preventDefault();
                      handleClick(item.href);
                    }}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <form
              onSubmit={onSubmit}
              className="gap-5 flex"
            >
              <div>
                    <div className="sm:col-span-2">
                      <div >
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Ingresá el nombre de la canción"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs"
                        />
                      </div>
                    </div>
                </div>
                <div>
                    <button
                      type="submit"
                      className="flex gap-2 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    <MagnifyingGlassIcon className="w-4 text-center mt-1"></MagnifyingGlassIcon>
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item, index) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={(event)=>{
                event.preventDefault();
                handleClick(item.href);
              }}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
