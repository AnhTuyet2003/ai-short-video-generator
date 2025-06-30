import { db } from "@/configs/db"; 
import { VideoEditConfig } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            videoId,
            fontFamily,
            fontSize,
            textColor,
            textAnimation,
            bgAnimation,
            sticker,
            stickerWidth,
            stickerHeight,
            audioUrl,
            screenSize
        } = body;

        if (!videoId) {
            return new Response(JSON.stringify({ error: "Missing videoId" }), { status: 400 });
        }

        // Đảm bảo stickerWidth và stickerHeight là số (nếu truyền lên là string)
        const width = stickerWidth ? Number(stickerWidth) : null;
        const height = stickerHeight ? Number(stickerHeight) : null;

        const existing = await db.select().from(VideoEditConfig).where(eq(VideoEditConfig.videoId, videoId));
        let result;
        if (existing.length > 0) {
            // Update
            [result] = await db.update(VideoEditConfig)
                .set({
                    fontFamily,
                    fontSize,
                    textColor,
                    textAnimation,
                    bgAnimation,
                    sticker,
                    stickerWidth: width,
                    stickerHeight: height,
                    audioUrl,
                    screenSize
                })
                .where(eq(VideoEditConfig.videoId, videoId))
                .returning();
        } else {
            // Insert
            [result] = await db.insert(VideoEditConfig)
                .values({
                    videoId,
                    fontFamily,
                    fontSize,
                    textColor,
                    textAnimation,
                    bgAnimation,
                    sticker,
                    stickerWidth: width,
                    stickerHeight: height,
                    audioUrl,
                    screenSize
                })
                .returning();
        }

        return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
    } catch (e) {
        console.error("API save-video-edit error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
