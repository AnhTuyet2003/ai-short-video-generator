"use client"

import React from "react";
import Header from "@/app/dashboard/_component/Header";
import SideNav from "./_component/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

function DashboardLayout({ children }) {
    const [videoData, setVideoData] = React.useState([]);
    const [userDetail, setUserDetail] = React.useState({});
    const {user} = useUser();

    const getUserDetail = async () => {
        console.log(user);
        if (user?.primaryEmailAddress?.emailAddress){
            const resp = await axios.get(
                `/api/get-user-detail?email=${encodeURIComponent(user.primaryEmailAddress.emailAddress)}`
            );
            setUserDetail(resp.data);
        }
    };

    useEffect(() => {
        user && getUserDetail();
    }, [user]);

    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                <div>
                    <div className="hidden md:block h-screen bg-white fixed mt-[78px] w-64">
                        <SideNav />
                    </div>
                    <div>
                        <Header />
                        <div className="md:ml-64 p-10">
                            {children}
                        </div>
                    </div>
                </div>
            </VideoDataContext.Provider>
        </UserDetailContext.Provider>
    )
}

export default DashboardLayout