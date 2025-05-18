import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Header() {
    return (
        <div className="p-3 px-5 flex items-center justify-between shadow-md">
            <div className="flex gap-3 item-center">
                <Image src="/logo.png" alt="logo" width={50} height={30}></Image>
                <h2 className="font-bold text-2xl flex items-center"> AI short vid</h2>
            </div>
            <div className="flex gap-3 items-center"> 
                <Button variant={'primary'}>Dashboard</Button>
                <UserButton/>
            </div>
        </div>
    )
}

export default Header