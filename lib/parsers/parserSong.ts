import * as cheerio from "cheerio";

type Fragment = {
  text: string
  chord?: string
}

type Line = {
  fragments: Fragment[]
}

type SongStructure = {
  lines: Line[]
}

export function parseSong(html: string): SongStructure {
  const $ = cheerio.load(html)

  const lines: Line[] = []

  const blocks = $("div.w-full.flex.justify-between")

  blocks.each((_, el) => {
    const chordEl = $(el)


    const chords = chordEl
      .find("span.chord")
      .map((_, c) => $(c).text().trim())
      .get()

    const text = chordEl
      .nextAll("div")
      .first()
      .text()
      .trim()

    if (!text) return
    lines.push({
      fragments: [
        {
          text,
          chord: chords.join(" / ") || undefined
        }
      ]
    });
  })

  return { lines }
}

export function migrateStructure(oldStructure: any) {
  if (!oldStructure) return null;

  // ya migrado → no tocar
  if (oldStructure.sections) return oldStructure;

  // formato viejo
  if (oldStructure.lines) {
    return {
      sections: [
        {
          type: "verse",
          lines: oldStructure.lines
        }
      ]
    }
  };

  return null;
}