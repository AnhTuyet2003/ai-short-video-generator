import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { videoId, videoData } = await req.json();

    await inngest.send({
        name: 'render/promo-video',
        data: {
            videoId,
            videoData
        }
    });
    return NextResponse.json({ result: 'Inngest Function Triggered' });
}