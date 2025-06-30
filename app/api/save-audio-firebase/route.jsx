import { storage } from '@/configs/FirebaseConfigs';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

/**
 * Upload a Blob or File to Firebase Storage and return the download URL.
 * @param {Blob|File|Response} blob - The audio file/blob/response to upload.
 * @param {string} filename - The filename to use in Firebase Storage.
 * @returns {Promise<string>} - The download URL of the uploaded file.
 */
export async function uploadAudioToFirebase(blob, filename) {
    if (blob instanceof Response) {
        blob = await blob.blob();
    }
    if (blob instanceof ArrayBuffer) {
        blob = new Blob([blob], { type: 'audio/mp3' });
    }
    if (typeof blob === "string") {
        throw new Error("Audio blob is a string (HTML/text), not a valid audio file.");
    }
    if (!blob || !blob.size) {
        throw new Error("Audio blob is empty or undefined");
    }
    if (blob.type !== "audio/mp3" && blob.type !== "audio/mpeg") {
        console.warn("Warning: Blob type is not audio/mp3. Actual type:", blob.type);
    }
    const storageRef = ref(storage, 'ai-short-video-files/' + filename);
    await uploadBytes(storageRef, blob, { contentType: 'audio/mp3' });
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
}
