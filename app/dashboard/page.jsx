"use client"

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import EmptyState from './_component/EmptyState';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import VideoList from './_component/VideoList';

export default function Dashboard() {
    const [videoList, setVideoList] = useState([]);
    const {user} = useUser();

    useEffect(() => {
        let email = user?.primaryEmailAddress?.emailAddress;
        if (email) {
            getVideoList(email);
        }
    }, [user]);

    /**
     * * Get video list from database
     */
    const getVideoList = async (email) => {
        const resp = await fetch(`/api/get-video-createdBy?email=${encodeURIComponent(email)}`);
        const data = await resp.json();
        setVideoList(data);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl text-purple-600'>Dashboard</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button variant={'primary'}>+ Create New</Button>
                </Link>
            </div>
            {/** Empty state */}
            {videoList?.length == 0 && <div>
                <EmptyState />
            </div>}

            {/** Video list */}
            <VideoList videoList={videoList}/>
        </div>

    )
}