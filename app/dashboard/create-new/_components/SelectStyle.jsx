"use client"

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

function SelectStyle({onUserSelect}) {
    const styleOptions =[
        {
            name:'Realistic',
            image:'/real.jpg'
        },
                {
            name:'Cartoon',
            image:'/cartoon.jpg'
        },
                {
            name:'Comic',
            image:'/comic.jpg'
        },
                {
            name:'Water Color',
            image:'/watercolor.jpg'
        },
                {
            name:'GTA',
            image:'/gta.jpg'
        }
    ]
    const [selectedOption, setSelectedOption] = useState();
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-2xl text-purple-600'>Style</h2>
            <p className='text-gray-500'>Select your video style</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
                {styleOptions.map((item, index) => (
                    <div className={`relative hove:duration-300 ease-out hover:scale-105 transition-all cursor-pointer rounded-xl 
                        ${selectedOption==item.name&&'border-4 border-purple-600'}`} key={index}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className='h-48 object-cover rounded-lg w-full'
                            onClick={() => {
                                setSelectedOption(item.name);
                                onUserSelect('imageStyle', item.name);
                            }}
                            />
                        <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle