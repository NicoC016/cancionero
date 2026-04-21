"use client"
import { useState } from "react";

import { MagnifyingGlassIcon, MusicalNoteIcon } from "@heroicons/react/24/outline"

import { Input } from "./ui/input";
import { EqualsIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function NavBar({ searchQuery, onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (title:string):any =>{
		const elementName = title.toLowerCase().replaceAll(' ', "_");
		const element = document.getElementById(elementName);
		if(element){
      element?.scrollIntoView({
        behavior: "smooth",
				block: "start",
			});
      setIsMenuOpen(false);
		}
	}
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <MusicalNoteIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-xl font-semibold text-foreground">Cancionero</h1>
              <p className="text-xs text-muted-foreground">San Pío</p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar canción..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-12 bg-muted border-0 focus-visible:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <HeartIcon className="w-5 h-5" />
            </Button> */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </Button> */}
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mt-4 pt-4 border-t border-border md:hidden">
            <ul className="space-y-2">
              {/* {subtitleOrder.map((item) => (
                <li key={item.name}>
                  <a onClick={()=>{navigateTo(item.name.toLowerCase().replaceAll(" ", "_"))}} className="block py-2 px-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    {item.name}
                  </a>
                </li>
              ))} */}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
