// API GET /api/get-audio-link?name=Happy.mp3
import { storage } from '@/configs/FirebaseConfigs';
import { ref, getDownloadURL } from 'firebase/storage';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    let name = searchParams.get("name");
    if (!name) {
        return new Response(JSON.stringify({ error: "Missing name param" }), { status: 400 });
    }

    if (!name.toLowerCase().endsWith(".mp3")) {
        name = name + ".mp3";
    }

    const nameMap = {
        "happy.mp3": "Happy.mp3",
        "piano.mp3": "Piano.mp3",
        "violin.mp3": "Violin.mp3"
    };
    name = nameMap[name.toLowerCase()] || name;

    try {
        const storageRef = ref(storage, 'ai-short-video-files/' + name);
        const url = await getDownloadURL(storageRef);
        return new Response(JSON.stringify({ url }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }
}
