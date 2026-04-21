import * as cheerio from "cheerio"
import { log } from "console"

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

    // acordes
    const chords = chordEl
      .find("span.chord")
      .map((_, c) => $(c).text().trim())
      .get()

    // el texto está en el sibling inmediato
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