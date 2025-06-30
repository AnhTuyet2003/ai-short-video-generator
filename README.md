# AI Short Video Generator

This project is an AI-powered short video generator and editor. Users can input a prompt, and the system will automatically generate a video script, create images and audio using AI, transcribe captions, and assemble everything into a customizable video. The editor allows users to adjust text, animations, stickers, music, and video size before exporting the final video. Rendering is handled by Remotion on Google Cloud Run for scalable, automated video production.

---

## Main Features

- **AI-powered video script generation** from user prompt
- **Automatic image generation** for video scenes
- **Text-to-speech audio generation** and **speech-to-text captioning**
- **Video editor** with:
  - Font, color, animation, and sticker customization
  - Music selection and upload
  - Adjustable video width and height (aspect ratio)
- **Real-time video preview** using Remotion Player
- **Export and render video** on Remotion CloudRun (Google Cloud Run)
- **Downloadable video output** with public URL
- **User authentication** and video management
- **API endpoints** for all major video generation and editing tasks

---

## Technologies Used

- **Next.js** (React framework for SSR/SSG)
- **React** (UI library)
- **Remotion** (Video rendering with React)
- **Remotion CloudRun** (Serverless video rendering on Google Cloud Run)
- **Google Cloud Run** (Serverless compute platform)
- **Firebase Storage** (Media file storage)
- **Drizzle ORM** (Database ORM)
- **PostgreSQL** (Database)
- **Inngest** (Event-driven background jobs)
- **TypeScript** (Type safety for JS/TS files)
- **Tailwind CSS** (Utility-first CSS framework)
- **Lucide React** (Icon library)
- **Axios** (HTTP client)
- **Sonner** (Toast notifications)
- **Google Fonts** (Web fonts)
- **Vercel** (Deployment platform for Next.js)
- **Bun/Yarn/PNPM/NPM** (Package managers)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-short-video-generator
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env.local` and fill in your Firebase, Cloud Run, and database credentials.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## API Documentation

### 1. Generate Video Script
**POST** `/api/get-video-script`

**Request:**
```json
{
    "prompt": "Your prompt for the AI model"
}
```
**Response:**
```json
{
    "result": {
        // AI-generated script as JSON
    }
}
```

---

### 2. Generate Image
**POST** `/api/generate-image`

**Request:**
```json
{
    "prompt": "Describe the image you want to generate"
}
```
**Response:**
```json
{
    "result": "https://...firebase.../your-image.png"
}
```

---

### 3. Generate Audio (Text-to-Speech)
**POST** `/api/generate-audio`

**Request:**
```json
{
    "text": "Text to convert to speech",
    "id": "unique-id-for-audio"
}
```
**Response:**
```json
{
    "Result": "https://...firebase.../your-audio.mp3"
}
```

---

### 4. Generate Caption (Speech-to-Text)
**POST** `/api/generate-caption`

**Request:**
```json
{
    "audioFileUrl": "https://...firebase.../your-audio.mp3"
}
```
**Response:**
```json
[
    {
        "text": "word",
        "start": 100,
        "end": 500
    },
    ...
]
```

---

### 5. Save Video Data
**POST** `/api/save-video-data`

**Request:**
```json
{
    "videoScript": "...",
    "audioFileUrl": "...",
    "captions": [...],
    "imageList": [...],
    "createdBy": "user@email.com"
}
```
**Response:**
```json
{
    "id": 123
}
```

---

### 6. Get Video Data by ID
**GET** `/api/get-video-data?id=VIDEO_ID`

**Response:**
```json
{
    "id": 123,
    "script": "...",
    "audioFileUrl": "...",
    "captions": [...],
    "imageList": [...],
    "createdBy": "user@email.com"
}
```

---

### 7. Proxy Audio (Bypass CORS)
**GET** `/api/proxy-audio?url=ENCODED_AUDIO_URL`

**Description:**  
Proxy audio file from a remote URL (e.g. Firebase Storage) to bypass CORS restrictions.  
Supports HTTP Range requests for seeking.

**Response:**  
Returns the audio file stream.

---

### 8. Save Video Edit Config
**POST** `/api/save-video-edit`

**Request:**
```json
{
    "videoId": 123,
    "editConfig": {
        "font": "Arial",
        "color": "#FFFFFF",
        "animation": "fade-in",
        "stickers": ["sticker1", "sticker2"],
        "music": "background-music.mp3",
        "aspectRatio": "16:9"
    }
}
```
**Response:**
```json
{
    "success": true
}
```

---

### 9. Get Audio Link (Firebase)
**GET** `/api/get-audio-link?name=FILENAME`

**Response:**
```json
{
    "url": "https://...firebase.../your-audio.mp3"
}
```

---

### 10. Save Audio to Firebase
**POST** `/api/save-audio-firebase`

**Request:**
```json
{
    "id": "unique-id-for-audio",
    "audioData": "base64-encoded-audio-data"
}
```
**Response:**
```json
{
    "success": true,
    "url": "https://...firebase.../your-audio.mp3"
}
```

---

### 11. Render Video (Trigger Inngest)
**POST** `/api/render`

**Request:**
```json
{
    "videoId": 123
}
```
**Response:**
```json
{
    "success": true,
    "jobId": "inngest-job-id"
}
```

---

### 12. Inngest API (Background Jobs)
**GET/POST/PUT** `/api/inngest`

**Description:**  
Gọi API Inngest để quản lý các job nền (background jobs) như render video, gửi thông báo, v.v.

**Request Example (POST):**
```json
{
    "event": "video.render",
    "data": {
        "videoId": 123
    }
}
```

**Response:**
```json
{
    "success": true,
    "jobId": "inngest-job-id"
}
```

---

### 13. Save Video Output Link
**POST** `/api/save-link-video`

**Request:**
```json
{
    "videoId": 123,
    "outputUrl": "https://...firebase.../your-output-video.mp4"
}
```
**Response:**
```json
{
    "success": true
}
```

---

> **Lưu ý:**  
> - Một số API yêu cầu truyền token hoặc xác thực, hãy kiểm tra lại cấu hình bảo mật nếu triển khai thực tế.
> - Các trường dữ liệu có thể thay đổi tùy theo cấu hình backend của bạn.

npx inngest-cli@latest dev
