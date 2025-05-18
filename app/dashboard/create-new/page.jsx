"use client"

import React, { useEffect, useContext } from 'react';
import SelectTopic from './_components/SelectTopic';
import { useState } from 'react';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { useUser } from '@clerk/nextjs';
import PlayerDialog from './_components/PlayerDialog';

function getScenes(data) {
    if (Array.isArray(data)) return data;
    return (
        data?.videoScenes ||
        data?.video_scenes ||
        data?.video_script ||
        data?.videoScript ||
        []
    );
}

function CreateNew() {
    const [formData, setFromData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState();
    const [audioFileUrl, setAudioFileUrl] = useState();
    const [captions, setCaptions] = useState();
    const [imageList, setImageList] = useState();
    const {videoData, setVideoData} = useContext(VideoDataContext);
    const {user} = useUser();
    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState();

    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);

        setFromData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const onCreateClickHandler = () => {
        GetVideoScript();
        //GenerateAudioFile(scriptData);
        //GenerateAudioCaption(fileUrl);
        //GenerateImage();
    }

    //Get the video script
    const GetVideoScript = async() => {
        setLoading(true);
        const prompt ='write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field'
        console.log(prompt);
        const resp = await axios.post('/api/get-video-script', {
            prompt: prompt
        })
        if(resp.data.result) {
            setVideoData(prev => ({
                ...prev,
                'videoScript': resp.data.result,
            }));
            setVideoScript(resp.data.result);
            resp.data.result && await GenerateAudioFile(resp.data.result);
        }
    }

    /**
     * Generate Audio file and Save to FireBase Storage
     * @param {*} videoScriptData 
     */
    const GenerateAudioFile = async(videoScriptData) => {
        setLoading(true);
        let script = '';
        const id = uuidv4();

        const scenes = getScenes(videoScriptData); // <-- dùng hàm này

        for (const element of scenes) {
            script += element.ContentText + ' ';
        }
        
        const resp = await axios.post('/api/generate-audio', {
            text: script,
            id: id
        })
        if(resp.data.Result) {
            setVideoData(prev => ({
                ...prev,
                'audioFileUrl': resp.data.Result,
            }));
            setAudioFileUrl(resp.data.Result);
            resp.data.Result && await GenerateAudioCaption(resp.data.Result, videoScriptData.video_script);
        }
    }

    /**
     * Use to generate audio caption from audio file
     * @param {*} fileUrl 
     */
    const GenerateAudioCaption = async(fileUrl, videoScriptData) => {
        setLoading(true);
        console.log(fileUrl);
        const resp = await axios.post('/api/generate-caption', {
            audioFileUrl: fileUrl
        })
        console.log('generate-caption resp:', resp.data);
        if(resp.data) {
            setVideoData(prev => ({
                ...prev,
                'captions': resp.data,
            }));
            setCaptions(resp.data);
            resp.data && await GenerateImage(videoScriptData);
        }

    }

    /**
     * Used to generate AI images (it's take money, pls consider carefully before using)
     */
    const GenerateImage = async(videoScriptData) => {
        let images = [];
        const scenes = getScenes(videoScriptData);
        for (const element of scenes) {
            try {
                const resp = await axios.post('/api/generate-image', {
                    prompt: element.imagePrompt
                })
                console.log(resp.data.result);
                images.push(resp.data.result); 
            } catch (error) {
                console.log('Error: '+error);
            }
        }
        setVideoData(prev => ({
            ...prev,
            'imageList': images,
        }));
        setImageList(images);
        setLoading(false);
    }

    useEffect(() => {
        console.log('videoData: ', videoData);
        if(Object.keys(videoData).length == 4) {
            saveVideoData(videoData);
        }
    }, [videoData]);

    const saveVideoData = async() => {
        setLoading(true);
        const result = await axios.post('/api/save-video-data', {
            videoScript: videoData.videoScript,
            audioFileUrl: videoData.audioFileUrl,
            captions: videoData.captions,
            imageList: videoData.imageList,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });
        setVideoId(result.data.id);
        setPlayVideo(true);
        console.log(result)
        setLoading(false)
    }

    return (
        <div className='md:px-20'>
            <h2 className='text-4xl font-bold text-purple-600 text-center'>Create New</h2>

            <div className='mt-10 shadow-md p-10'>
                {/* Select topic */}
                <SelectTopic onUserSelect = {onHandleInputChange}/>
                {/* Select type */}
                <SelectStyle onUserSelect = {onHandleInputChange}/>
                {/* Select duration */}
                <SelectDuration onUserSelect={onHandleInputChange}/>
                {/* Create button */}
                <Button onClick={onCreateClickHandler} className={'mt-10 w-full'} variant='primary'>Create short video</Button>
            </div>
            <CustomLoading loading={loading}/>
            {playVideo && (<PlayerDialog playVideo={playVideo} videoId={videoId} />)}
        </div>
    )
}

export default CreateNew