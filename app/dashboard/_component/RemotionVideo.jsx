import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { interpolate } from 'remotion';

function RemotionVideo({ script = "", audioFileUrl = "", captions = [], imageList = [], setDurationFrame = null }) {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const proxiedAudioUrl = `/api/proxy-audio?url=${encodeURIComponent(audioFileUrl)}`;
    useEffect(() => {
        if (setDurationFrame && captions.length > 0) {
            const duration = (captions[captions.length - 1]?.end / 1000) * fps;
            setDurationFrame(duration);
        }
    }, [captions, fps, setDurationFrame]);

    const getDurationFrame = () => {
        return captions[captions.length - 1]?.end / 1000 * fps || 60;
    };

    const getCurrentCaptions = () => {
        const currentTime = frame / 30 * 1000
        const currentCaption = captions.find((word) => currentTime >= word.start && currentTime <= word.end);
        return currentCaption ? currentCaption?.text : "";
    }

    return (
        <AbsoluteFill className='bg-black'>
            {imageList?.map((item, index) => {
                const startTime = index * getDurationFrame() / imageList.length;
                const duration = getDurationFrame();

                const scale = (index) => interpolate(
                    frame,
                    [startTime, startTime+duration/2, startTime+duration],
                    index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                    {extrapolateLeft:'clamp', extrapolateRight: 'clamp'}
                )
                return (
                    <Sequence
                        key={index}
                        from={startTime}
                        durationInFrames={getDurationFrame()}
                    >
                        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Img
                                src={item}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: `scale(${scale(index)})`,
                                }}
                            />
                            <AbsoluteFill style={{
                                color: 'white', justifyContent: 'center',
                                top: undefined, bottom: 50, height: 150, textAlign: 'center', width: '100%'
                            }}   >
                                <h2 className='text-2xl'>{getCurrentCaptions()}</h2>
                            </AbsoluteFill>
                        </AbsoluteFill>
                    </Sequence>
                )
            })}

            {proxiedAudioUrl && (
                <Audio src={proxiedAudioUrl} />
            )}

        </AbsoluteFill>
    );
}

export default RemotionVideo;

