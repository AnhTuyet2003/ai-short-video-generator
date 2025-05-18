import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, imageUrl } = await req.json();
    const result = await db.select().from(Users).where(eq(Users.email, email));
    if (!result[0]) {
      await db.insert(Users).values({ name, email, imageUrl });
      return NextResponse.json({ status: "created" });
    }
    return NextResponse.json({ status: "exists" });
  } catch (error) {
    console.error("Error in /api/new-user:", error);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
