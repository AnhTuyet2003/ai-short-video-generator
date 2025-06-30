"use client";
import { useRef } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "./RemotionComposition";
import { Fullscreen, Music } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DropDown from "./DropDown";
import { MusicList } from "@/app/_data/Music";

function RemotionPlayer({
    videoData, fontSize, fontFamily, color, animationType, bgAnimationType,
    sticker, stickerWidth, stickerHeight, selectedMusic, setSelectedMusic,
    screenSize, setScreenSize
}) {
    const playerRef = useRef(null);

    const fps = 30;
    let durationInFrames = 60;
    if (Array.isArray(videoData?.captions) && videoData.captions.length > 0) {
        durationInFrames = Math.round((videoData.captions[videoData.captions.length - 1]?.end / 1000) * fps);
    }

    const handleScreenSizeChange = (v) => {
        const newSize = JSON.parse(v);
        setScreenSize((prev) =>
            prev.width !== newSize.width || prev.height !== newSize.height
                ? newSize
                : prev
        );
    };

    if (!videoData) return <div>No video data</div>;

    return (
        <div>
            <div className="flex justify-center items-center">
                <Player
                    ref={playerRef}
                    component={RemotionComposition}
                    durationInFrames={durationInFrames}
                    compositionWidth={screenSize.width}
                    compositionHeight={screenSize.height}
                    fps={fps}
                    controls
                    acknowledgeRemotionLicense
                    style={{
                        borderRadius: 6,
                        width: "100%",
                        height: 340,
                    }}
                    inputProps={{
                        script: videoData.script,
                        audioFileUrl: videoData.audioFileUrl,
                        captions: videoData.captions,
                        imageList: videoData.imageList,
                        fontSize,
                        fontFamily,
                        color,
                        animationType,
                        bgAnimationType,
                        musicFile: selectedMusic,
                        sticker, 
                        stickerWidth,
                        stickerHeight,
                    }}
                />
            </div>

            <div className="mt-5 flex gap-2 px-10 items-center">
                <div className="flex gap-2 items-center w-full">
                    <Fullscreen />
                    <Select onValueChange={handleScreenSizeChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="16:9" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={JSON.stringify({ width: 500, height: 500 })}>1:1</SelectItem>
                            <SelectItem value={JSON.stringify({ width: 600, height: 340 })}>16:9</SelectItem>
                            <SelectItem value={JSON.stringify({ width: 340, height: 600 })}>9:16</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2 items-center w-full">
                    <Music />
                    <Select onValueChange={setSelectedMusic}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                            {MusicList.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default RemotionPlayer;