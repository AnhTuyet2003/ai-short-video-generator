import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

function Header() {
    const {userDetail, setUserDetail} = React.useContext(UserDetailContext);
    return (
        <div className="p-3 px-5 flex items-center justify-between shadow-md">
            <div className="flex gap-3 item-center">
                <Image src="/logo.png" alt="logo" width={50} height={30}></Image>
                <h2 className="font-bold text-2xl flex items-center"> AI short vid</h2>
            </div>
            <div className="flex gap-3 items-center"> 
                <div className="flex gap-2 items-center">
                    <h2>{userDetail?.credits}</h2>
                    <Image src={'/dollar.gif'} alt="dollar" width={20} height={20}></Image>
                </div>
                <Button variant={'primary'}>Dashboard</Button>
                <UserButton/>
            </div>
        </div>
    )
}

export default Header