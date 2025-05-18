import React from 'react';
import {Thumbnail} from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from '../create-new/_components/PlayerDialog';

function VideoList({ videoList }) {
    const [openPlayerDialog, setOpenPlayerDialog] = React.useState(false);
    const [videoId, setVideoId] = React.useState(null);
    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {videoList?.map((video, index) => (
                <div className='hover:scale-105 transition-all cursor-pointer' key={index}
                onClick={() => {
                    setOpenPlayerDialog(Date.now());
                    setVideoId(video?.id);}}>
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={250}
                        compositionHeight={390}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style = {{
                            borderRadius:15
                        }}
                        inputProps={{
                           ...video,
                           setDurationInFrame :(v) => console.log(v)
                        }}
                    />
                </div>
            ))}
            <PlayerDialog playVideo={openPlayerDialog} videoId={videoId}/>
        </div>
    );
}

export default VideoList;