// import { prisma } from "@/libs/prisma"
// import { migrateStructure, parseSong } from "../lib/parsers/parserSong"


// async function main() {
//     if (process.env.RUN_MIGRATION !== "true") {
//         throw new Error("Set RUN_MIGRATION=true to run")
//     }
//     const songs = await prisma.song.findMany();

//   for (const song of songs) {
//     if (!song.letter) continue

//     const structure = parseSong(song.letter)


//     if (!structure.lines.length) {
//         console.log("⚠️ Vacía:", song.name);
//         return;
//     }

//     await prisma.song.update({
//       where: { id: song.id },
//       data: {
//         structure
//       }
//     })

//     console.log(`Migrated: ${song.name}`)
//   }

//     for (const song of songs) {
//         if (!song.structure) continue;

//         const newStructure = migrateStructure(song.structure)

//         if (!newStructure) {
//           console.log("⚠️ Skip:", song.name);
//           continue;
//         }

//         await prisma.song.update({
//           where: { id: song.id },
//           data: {
//             structure: newStructure
//           }
//         });

//         console.log("Migrated:", song.name);
//     }
// }

// main()
//   .then(() => {
//     console.log("Migration done")
//     process.exit(0)
//   })
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })