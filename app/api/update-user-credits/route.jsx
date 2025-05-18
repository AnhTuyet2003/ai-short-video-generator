import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(request) {
    try {
        const { email, credits } = await request.json();
        if (!email || typeof credits !== "number") {
            return new Response(JSON.stringify({ error: "Missing or invalid params" }), { status: 400 });
        }
        const result = await db.update(Users)
            .set({ credits })
            .where(eq(Users.email, email));
        return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}