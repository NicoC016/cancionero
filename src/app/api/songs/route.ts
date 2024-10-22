import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(){    
    try {
        const song = await prisma.song.findMany();
        return NextResponse.json(song, { status: 200 });
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