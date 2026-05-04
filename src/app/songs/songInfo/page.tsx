"use client"

import { getLineChords, getLineText, getTypeStyles } from "@/app/utils/song.helper";
import { transposeChord } from "@/app/utils/transport-note";
import { Song } from "@/models";

function SongsInfo({ song, showChords, transpose }: {song:Song, showChords:boolean, transpose: number}) {
  return (
    <div>
      {song?.structure?.sections.map((section, i) => (
        <div className={`rounded-lg p-4 ${getTypeStyles(section.type)}`} key={i}>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
            {section.type}
          </span>
          <div className="space-y-2">
            {section.lines.map((line, j) => (
              <div key={j} className="relative">
                <div className="text-primary font-mono text-sm font-bold mb-0.5">
                  {showChords? (
                    transposeChord(getLineChords(line).join(" "), transpose)
                  ):(
                    <div></div>
                  )}
                </div>
                <div className="text-foreground leading-relaxed">{getLineText(line)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default SongsInfo;
