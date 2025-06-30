"use client";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import TrackList from '../_components/TrackList';
import RemotionPlayer from '../_components/RemotionPlayer';
import { VideoFramesContext } from "@/app/_context/VideoFramesContext";
import { useParams } from 'next/navigation';
import FrameConfig from '../_components/FrameConfig';
import { uploadAudioToFirebase } from '@/app/api/save-audio-firebase/route';
import ExportButton from '../_components/ExportButton';


function Editor() {
    const params = useParams();
    const { id } = params;
    const [videoFrames, setVideoFrames] = React.useState({
        totalDuration: 0,
        frameList: []
    });
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = React.useState(32);
    const [fontFamily, setFontFamily] = React.useState("Bungee");
    const [color, setColor] = React.useState("#fff");
    const [animationType, setAnimationType] = React.useState("fade");
    const [bgAnimationType, setBgAnimationType] = React.useState("fade");
    const [sticker, setSticker] = useState(null);
    const [stickerWidth, setStickerWidth] = useState(64);
    const [stickerHeight, setStickerHeight] = useState(64);
    const [audioUrl, setAudioUrl] = useState(null);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [screenSize, setScreenSize] = useState({ width: 600, height: 340 });

    useEffect(() => {
        if (!id) return;
        const fetchVideoData = async () => {
            setLoading(true);
            const res = await fetch(`/api/get-video-data?id=${id}`);
            const data = await res.json();
            setVideoData(data);
            setLoading(false);
        };
        fetchVideoData();
    }, [id]);

    const handleSave = async () => {
        try {
            let audioUrl = null;
            if (selectedMusic) {
                // Lấy file từ public folder (ví dụ: /public/music/Piano.mp3)
                const filePath = `/${selectedMusic}.mp3`; // giữ nguyên chữ hoa/thường đúng tên file
                const response = await fetch(filePath);
                // Đọc blob và kiểm tra size
                const blob = await response.blob();
                if (!blob || !blob.size) {
                    throw new Error("Không tìm thấy file audio hoặc file không hợp lệ!");
                }
                // Upload blob lên Firebase Storage
                audioUrl = await uploadAudioToFirebase(blob, selectedMusic + ".mp3");
            }
            const res = await fetch("/api/save-video-edit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    videoId: id,
                    fontFamily,
                    fontSize,
                    textColor: color,
                    textAnimation: animationType,
                    bgAnimation: bgAnimationType,
                    sticker,
                    stickerWidth,
                    stickerHeight,
                    audioUrl,
                    screenSize: JSON.stringify(screenSize), // thêm screenSize
                })
            });
            if (!res.ok) {
                const err = await res.json();
                alert("Save failed: " + (err.error || "Unknown error"));
                return;
            }
            window.location.href = "/dashboard";
        } catch (e) {
            alert("Save failed: " + e.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!videoData) return <div>Video not found</div>;

    return (
        <div>
            <div className='p-10 md:px-24 lg:px-32'>
                <VideoFramesContext.Provider value={{ videoFrames, setVideoFrames }}>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-2xl'>Editor Video</h2>
                        <div className='flex gap-2'>
                            <Button variant="secondary" className='hover:cursor-pointer hover:bg-gray-500' onClick={handleSave}>Save</Button>
                            <ExportButton
                                videoId={id}
                                videoData={videoData}
                                fontSize={fontSize}
                                fontFamily={fontFamily}
                                color={color}
                                animationType={animationType}
                                bgAnimationType={bgAnimationType}
                                sticker={sticker}
                                stickerWidth={stickerWidth}
                                stickerHeight={stickerHeight}
                                selectedMusic={selectedMusic}
                                screenSize={screenSize}
                                width={screenSize.width}
                                height={screenSize.height}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-6 gap-7 mt-7'>
                        {/* <div>
                            <TrackList/>
                        </div> */}
                        <div className='col-span-3'>
                            <RemotionPlayer
                                videoData={videoData}
                                fontSize={fontSize}
                                fontFamily={fontFamily}
                                color={color}
                                setFontSize={setFontSize}
                                setFontFamily={setFontFamily}
                                animationType={animationType}
                                bgAnimationType={bgAnimationType}
                                sticker={sticker}
                                stickerWidth={stickerWidth}
                                stickerHeight={stickerHeight}
                                selectedMusic={selectedMusic}
                                setSelectedMusic={setSelectedMusic}
                                screenSize={screenSize}
                                setScreenSize={setScreenSize}
                            />
                        </div>
                        <div className='col-span-3'>
                            <FrameConfig
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                                fontFamily={fontFamily}
                                setFontFamily={setFontFamily}
                                color={color}
                                setColor={setColor}
                                animationType={animationType}
                                setAnimationType={setAnimationType}
                                bgAnimationType={bgAnimationType}
                                setBgAnimationType={setBgAnimationType}
                                sticker={sticker}
                                setSticker={setSticker}
                                stickerWidth={stickerWidth}
                                setStickerWidth={setStickerWidth}
                                stickerHeight={stickerHeight}
                                setStickerHeight={setStickerHeight}
                                screenSize={screenSize}
                                setScreenSize={setScreenSize}
                            />
                        </div>
                    </div>
                </VideoFramesContext.Provider>
            </div>
        </div>
    )
}

export default Editor;