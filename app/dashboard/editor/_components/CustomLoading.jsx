import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image';

function CustomLoading({loading}) {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogTitle>Generating Video</AlertDialogTitle>
                    <AlertDialogDescription className={'hidden'}>
                        Please wait while your video is being generated. Do not refresh or close the page.
                    </AlertDialogDescription>
                    <div className='flex flex-col my-10 items-center justify-center'>
                        <Image src="/loading.gif" alt='Loading' width={100} height={100}/>
                        <h2>Generating your video... Do not refresh</h2>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CustomLoading