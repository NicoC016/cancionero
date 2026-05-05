const SHARP_NOTES = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B"
];

const FLAT_NOTES = [
  "C", "Db", "D", "Eb", "E", "F",
  "Gb", "G", "Ab", "A", "Bb", "B"
];

const splitterParam = [
  "#", "7", "b", "9", "6", "sus",
  "aug", "dis", 'm'
];

const ConvertionToAmericanEncryption:any = {
  do: "C",
  re: "D",
  mi: "E",
  fa: "F",
  sol: "G",
  la: "A",
  si: "B"
}

const ConvertionToUnitedStateEncryption:any = {
  c: "Do",
  d: "Re",
  e: "Mi",
  f: "Fa",
  g: "Sol",
  a: "La",
  b: "Si"
}

const checkIsIsNormalEncryption = (chord:string):string => {
  return ConvertionToAmericanEncryption[chord.toLowerCase()];
}

const changeEncryption = (chord:string):string => {
  const splitterParam = getSplitterParams(chord);

  if(chord.includes(splitterParam)){
    const chordSeparate = chord.split(splitterParam);
    const chordReturn = ConvertionToUnitedStateEncryption[chordSeparate[0].toLowerCase()].concat(splitterParam) ;
    return chordReturn;
  }
  return ConvertionToUnitedStateEncryption[chord.toLowerCase()];

}

const getSplitterParams = (chord:string) => {
	const getChord = splitterParam.find(res => includeInChord(chord, res)) as string;
	return getChord;
}

const includeInChord = (chord:string, includedString:string) => chord.includes(includedString);

function useFlats(chord: string) {
  return chord.includes("b");
}

function parseChord(chord: string) {
  	const splitterParam = getSplitterParams(chord);

  	if(chord.includes(splitterParam)){
  	  	const match = chord.split(splitterParam);
  	  	if (!match) return null;

		const suffix = !match[1]? splitterParam: match[1];
  	  	return {
  	  	  	root: match[0],
  	  	  	suffix: suffix || ""
  	  	};
  	}
  	return {
    	root: chord,
      	suffix: ""
  	};
}

function transposeNote(note: string, steps: number, preferFlats: boolean) {
    const scale = preferFlats ? FLAT_NOTES : SHARP_NOTES;
    const altScale = preferFlats ? SHARP_NOTES : FLAT_NOTES;
    let index = scale.indexOf(note);

    if (index === -1) {
        index = altScale.indexOf(note);
        if (index === -1) return note;
    }

    let newIndex = (index + steps) % 12;
    if (newIndex < 0) newIndex += 12;
    return scale[newIndex];
}

export function transposeChord(chord: string, steps: number): string {
    if (!chord) return chord;
    if (chord.includes("/")) {
        const [base, bass] = chord.split("/");

        return (
        	transposeChord(base.trim(), steps) +
        	"/" +
        	transposeChord(bass.trim(), steps)
        );
    }

    const parsed = parseChord(chord);
    if (!parsed) return chord;

    const preferFlats = useFlats(chord);
    const chordParsed = checkIsIsNormalEncryption(parsed.root)? checkIsIsNormalEncryption(parsed.root) : parsed.root;
    const newRoot = transposeNote(chordParsed, steps, preferFlats);
    const newChord = checkIsIsNormalEncryption(newRoot)? newRoot: changeEncryption(newRoot);

    return newChord + (parsed.suffix);
}