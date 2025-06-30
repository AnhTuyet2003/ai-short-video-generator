This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Documentation

### 2. Generate Video Script
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

### 3. Generate Image
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

### 4. Generate Audio (Text-to-Speech)
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

### 5. Generate Caption (Speech-to-Text)
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

### 6. Save Video Data
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

### 7. Get Video Data by ID
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

### 8. Proxy Audio (Bypass CORS)
**GET** `/api/proxy-audio?url=ENCODED_AUDIO_URL`

**Description:**  
Proxy audio file from a remote URL (e.g. Firebase Storage) to bypass CORS restrictions.  
Supports HTTP Range requests for seeking.

**Response:**  
Returns the audio file stream.

---

## Main Features

- AI-powered video script generation from user prompt
- Automatic image generation for video scenes
- Text-to-speech audio generation and speech-to-text captioning
- Video editor with:
  - Font, color, animation, and sticker customization
  - Music selection and upload
  - Adjustable video width and height (aspect ratio)
- Real-time video preview using Remotion Player
- Export and render video on Remotion CloudRun (Google Cloud Run)
- Downloadable video output with public URL
- User authentication and video management
- API endpoints for all major video generation and editing tasks

> **Lưu ý:**  
> - Một số API yêu cầu truyền token hoặc xác thực, hãy kiểm tra lại cấu hình bảo mật nếu triển khai thực tế.
> - Các trường dữ liệu có thể thay đổi tùy theo cấu hình backend của bạn.


npx inngest-cli@latest dev