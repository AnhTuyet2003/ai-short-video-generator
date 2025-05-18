import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";

export async function POST(req) {
    const body = await req.json();
    const { videoScript, audioFileUrl, captions, imageList, createdBy } = body;
    if (!videoScript || !audioFileUrl || !captions || !imageList || !createdBy) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const result = await db.insert(VideoData).values({
        script: videoScript,
        audioFileUrl,
        captions,
        imageList,
        createdBy,
    }).returning({id: VideoData?.id});
    return NextResponse.json({ id: result[0].id });
}