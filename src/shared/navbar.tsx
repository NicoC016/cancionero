"use client"

import { MagnifyingGlassIcon, MusicalNoteIcon } from "@heroicons/react/24/outline"
import { Input } from "./ui/input";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSearchStore } from "@/app/utils/store/zustand.store";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";


export default function NavBar() {
   	const { query, setQuery } = useSearchStore();
    const pathname = usePathname();
  	const router = useRouter();
	const isDetailPage = pathname.startsWith("/songs/");
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
    	  	  	  	{!isDetailPage ? (
    	  	  	    	<div className="flex-1 max-w-md">
    	  	  	    		<div className="relative">
    	  	  	    		  	<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    	  	  	    		  	<Input
    	  	  	    		  	  	type="text"
    	  	  	    		  	  	placeholder="Buscar canción..."
    	  	  	    		  	  	value={query}
    	  	  	    		  	  	onChange={(e) => setQuery(e.target.value)}
    	  	  	    		  	  	className="pl-10 pr-12 bg-muted border-0 focus-visible:ring-primary"
    	  	  	    		  	/>
    	  	  	    		  	{query && (
    	  	  	    		  	  	<button
    	  	  	    		  	    	onClick={() => setQuery("")}
    	  	  	    		  	    	className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    	  	  	    		  	  	>
    	  	  	    		  	    	<XMarkIcon className="w-4 h-4" />
    	  	  	    		  	  	</button>
    	  	  	    		  	)}
    	  	  	    		</div>
    	  	  	  		</div>
    	  	  	  	):(
						<Button onClick={() => router.push("/")}>
							<ArrowLeftIcon/>
							<span>Volver</span>
        				</Button>
					)}
    	  	  	</div>
    	  	</div>
    	</header>
  	);
}
