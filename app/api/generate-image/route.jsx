import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { storage } from '@/configs/FirebaseConfigs';
import { getDownloadURL, ref } from "firebase/storage";
import axios from "axios";
import { uploadString } from "firebase/storage";

export async function POST(req) {
    try {
        const {prompt} = await req.json();
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1,

        };

        const output = await replicate.run("bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe", { input });
        
        //Save to FireBase
        //const base64Image = "data:image/png;base64," + await ConvertImage(output[0]);
        let prediction = await replicate.predictions.create({
            version: "6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
            input: input,
        });

        while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed" &&
        prediction.status !== "canceled"
        ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        prediction = await replicate.predictions.get(prediction.id);
        }

        // Lúc này bạn sẽ có prediction.urls.stream
        const base64Image = "data:image/png;base64," + await ConvertImage(prediction.urls.stream);

        const fileName = 'ai-short-video-files/' + Date.now() + ".png"
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);

        return NextResponse.json({'result': downloadUrl})
    } catch (error) {
        return NextResponse.json({ 'error': error })
    }
} 

const ConvertImage = async(imageUrl) => {
    try {
        const resp = await axios.get(imageUrl, {responseType:'arraybuffer'});
        
        const base64Image = Buffer.from(resp.data).toString('base64');
        return base64Image;
    } catch (error) {
        console.log('Error ',error);
    }
}