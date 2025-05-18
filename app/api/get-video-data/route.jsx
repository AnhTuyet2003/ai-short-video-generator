import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const result = await db.select().from(VideoData).where(eq(VideoData.id, id));
    if (!result.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(result[0]);
}