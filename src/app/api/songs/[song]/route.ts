import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request:any, {params}:any){    
    try {
        const song = await prisma.song.findMany({
            where: {
                name:{
                    contains:params.song,
                }
            }
        });
        if(!song){
            return NextResponse.json({
                status:'error',
                message:'Canciones no encontradas',
                code:404,
            });
        }
        return NextResponse.json(song);
    } catch (error:any) {
        return NextResponse.json({
            status:'error',
            message:error.message,
            code:404,
        });
    }
}