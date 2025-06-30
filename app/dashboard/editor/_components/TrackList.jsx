"use client"
import { VideoFramesContext } from "@/app/_context/VideoFramesContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const defaultFrame = {
    image: '/footage.gif',
    text: 'Hello World',
    textColor: 'black',
    fontSize: 20,
    duration: 2,
}

function TrackList() {
    const [frameList, setFrameList] = useState([defaultFrame]);
    const [selectedFrame, setSelectedFrame] = useState(null);
    const videoFramesContext = useContext(VideoFramesContext) || {};
    const { videoFrames, setVideoFrames } = videoFramesContext;

    const addNewFrame = () => {
        setFrameList(prev => [
            ...prev,
            defaultFrame
        ])
    }
    
    const removeFrame = (indexToRemove) => {
        const updatedFrameList = frameList?.filter((_, index) => index !== indexToRemove);
        setFrameList(updatedFrameList);
    }

    useEffect(() => {
        let totalDuration = 0;
        frameList.forEach(frame => {
            totalDuration += frame.duration;
        })

        frameList && setVideoFrames({
            totalDuration: totalDuration,
            frameList: frameList,
            selectedFrame: selectedFrame
        })
    }, [frameList, selectedFrame])

    return (
        <div className="p-5 bg-gray-100 rounded-lg">
            <div className="h-[55vh] overflow-scroll scrollbar-hide">
                {frameList.map((frame, index) => (
                    <div key={index} className={`flex flex-col items-center rounded-lg p-2 mt-3 cursor-pointer ${selectedFrame == index && `bg-white`}`}
                        onClick={() => setSelectedFrame(index)}>
                        <Image src={frame.image} alt={index} width={40} height={40}
                            className="w-full h-[40px object-contain rounded-lg border-b pb-2" />
                        <h2 className="text-xs line-clamp-2 mt-1">
                            {frame.text}
                        </h2>
                        {selectedFrame == index && <Trash2 className="mt-1 h-3 w-3 text-red-500" onClick={() => removeFrame(index)} />}
                    </div>
                ))}
            </div>
            <Button variant="primary" size="sm" className="mt-5 w-full object-contain" onClick={addNewFrame}>New Frame</Button>

        </div>
    )
}

export default TrackList;