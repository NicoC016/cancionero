import { Song } from "@/models";
import { SparklesIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { BodyOfCrist, BookCrossIcon, ChurchIcon, CrossBig, CrossIcon, CrownIcon, CupIcon, FishIcon, HeartCrossIcon, HolyGhostIcon, LambIcon, PrayingHandsIcon, TreeIcon, VirginIcon } from "../../../public/icons";

export const getTypeStyles = (type: "verse" | "chorus" | "bridge" | "intro" | "outro") => {
  switch (type) {
    case "chorus":
      return "bg-primary/5 border-l-4 border-primary"
    case "bridge":
      return "bg-accent/5 border-l-4 border-accent"
    default:
      return "bg-transparent"
  }
}

export const decodeName = (name: string) => {
    const newName = name?.trim().replaceAll("-", " ");
    return newName;
};

export const orderSongs = (songs:Song[]) =>{
    const newArrSong = songs?.sort((x, z)=> x.name.localeCompare(z.name));
    return newArrSong;
}

export const subtitleOrder = [
    {name:"Entrada", icon:'church'},
    {name:"Acto penitencial", icon:'heartCross'},
    {name:"Gloria", icon:'sparkles'},
    {name:"Salmo", icon:'holyBible'},
    {name:"Aleluya", icon:'cross'},
    {name:"Ofrenda", icon:'cup'},
    {name:"Santo", icon:'crossBig'},
    {name:"Cordero", icon:'lamb'},
    {name:"Comunión", icon:'bodyOfCrist'},
    {name:"Alabanzas", icon:'hand'},
    {name:"Salida", icon:'arrow'},
    {name:"Cantos Marianos", icon:'virgin'},
    {name:"Cantos al espíritu santo", icon:'holyGhost'},
    {name:"Cantos de navidad", icon:'tree'},
    {name:"Pascua", icon:'crown'},
    {name:"Otros cantos", icon:'fish'},
];

const iconMap = {
  church: ChurchIcon,
  sparkles: SparklesIcon,
  arrow: ArrowRightStartOnRectangleIcon,
  cup: CupIcon,
  cross: CrossIcon,
  holyBible: BookCrossIcon,
  fish:FishIcon,
  hand: PrayingHandsIcon,
  crown:CrownIcon,
  holyGhost: HolyGhostIcon,
  crossBig: CrossBig,
  lamb:LambIcon,
  heartCross:HeartCrossIcon,
  bodyOfCrist:BodyOfCrist,
  tree:TreeIcon,
  virgin: VirginIcon
}

export function getIcon(name?: string) {
  return name ? iconMap[name as keyof typeof iconMap] : undefined
}


export function getLineText(line: any) {
  return line.fragments.map((f: any) => f.text).join("")
}

export function getLineChords(line: Fragments) {
  return line.fragments
    .map((f: any) => f.chord)
    .filter(Boolean)
}
