import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
        return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }
    const result = await db.select().from(Users).where(eq(Users.email, email));
    return new Response(JSON.stringify(result[0] || null), { status: 200 });
}