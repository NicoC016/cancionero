import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

/* eslint-disable */
export async function GET(){    
    try {
        const songSearch = await prisma.song.findMany();       
        return NextResponse.json(songSearch);
    } catch (error:any) {
        return NextResponse.json({
            status:'error',
            message:error.message,
            code:404,
        });
    }
}

export async function POST(request:any ){    
    try {
        const song = await prisma.song.createMany({
            data:request.data
        });
        return NextResponse.json(song, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({
            status:'error',
            message:error.message,
            code:404,
        });
    }
}