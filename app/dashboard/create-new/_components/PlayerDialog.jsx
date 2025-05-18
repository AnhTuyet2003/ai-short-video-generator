import React, { useEffect, useState } from 'react';
import { Player } from "@remotion/player";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RemotionVideo from '../../_component/RemotionVideo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function PlayerDialog({ playVideo, videoId }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState()
    const [durationInFrame, setDurationInFrame] = useState(100)
    const router = useRouter();

    useEffect(() => {
        setOpenDialog(!openDialog);
        videoId && GetVideoData();
    }, [playVideo])

    const GetVideoData = async () => {
        try {
            const resp = await fetch(`/api/get-video-data?id=${videoId}`);
            const data = await resp.json();
            console.log(data);
            setVideoData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={openDialog}>
            <DialogContent className={'bg-white flex flex-col items-center'}>
                <DialogHeader>
                    <DialogTitle className='text-3xl font-bold my-5'>Your video is ready</DialogTitle>
                </DialogHeader>
                <Player
                    component={RemotionVideo}
                    durationInFrames={Number(durationInFrame.toFixed(0))}
                    compositionWidth={300}
                    compositionHeight={450}
                    fps={30}
                    controls={true}
                    inputProps={{
                        ...videoData,
                        setDurationFrame:(frameValue) => setDurationInFrame(frameValue)
                    }}
                />
                <div className='flex gap-10 mt-10'>
                    <Button variant="ghost" onClick={() => {router.replace('/dashboard'); setOpenDialog(false)}}>Cancel</Button>
                    <Button variant="primary">Export</Button>
                </div>
            </DialogContent>
        </Dialog>

    );
}

export default PlayerDialog;