import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";

// API POST /api/save-link-video
export async function POST(req) {
    try {
        const { videoId, videoOutputUrl } = await req.json();
        if (!videoId || !videoOutputUrl) {
            return new Response(JSON.stringify({ error: "Missing videoId or videoOutputUrl" }), { status: 400 });
        }

        const result = await db
            .update(VideoData)
            .set({ videoOutputUrl })
            .where(eq(VideoData.id, videoId));

        return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
