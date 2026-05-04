type SongStructure = {
  sections: Section[];
}

type Section = {
  type: "verse" | "chorus" | "bridge" | "intro" | "outro";
  lines: Fragments[];
}

type Fragments = {
    fragments:Line[];
}

type Line = {
  text: string[];
  chords?: string[];
}