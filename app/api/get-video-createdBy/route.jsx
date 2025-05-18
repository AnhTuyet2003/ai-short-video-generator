import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) {
    return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400 });
  }
  const result = await db.select().from(VideoData).where(eq(VideoData.createdBy, email));
  return new Response(JSON.stringify(result), { status: 200 });
}