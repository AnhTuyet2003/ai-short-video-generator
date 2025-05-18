"use client"

import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideNav() {
    const MenuOptions = [
        {
            id: 1,
            name: "Dashboard",
            icon: PanelsTopLeft,
            path: "/dashboard"
        },
                {
            id: 2,
            name: "Create",
            icon: FileVideo,
            path: "/dashboard/create-new"
        },
                {
            id: 3,
            name: "Upgrade",
            icon: ShieldPlus,
            path: "/upgrade"
        },
                {
            id: 4,
            name: "Account",
            icon: CircleUser,
            path: "/account"
        },
    ]
    const path = usePathname();
    return (
        <div className='w-64 h-screen shadow-md p-5'>
            <div className='grid gap-3'>
                {MenuOptions.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div className={`flex items-center gap-3 p-3 hover:bg-purple-600 
                        hover:text-white rounded-md cursor-pointer ${path==item.path&&'bg-purple-600 text-white'}`}>
                            <item.icon/>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav