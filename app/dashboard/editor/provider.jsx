import { VideoFramesContext } from '@/app/_context/VideoFramesContext';
import React, { useState } from 'react';

function Provider({ children }) {
    const {videoFrames, setVideoFrames} = useState([]);
    return (
        <div>
            <VideoFramesContext.Provider value={{videoFrames, setVideoFrames}} >
                {children}
            </VideoFramesContext.Provider>
        </div>
    );
};

export default Provider;