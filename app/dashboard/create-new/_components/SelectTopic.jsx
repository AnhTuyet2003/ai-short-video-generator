"use client"
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

function SelectTopic({onUserSelect}) {
    const options = ['Custom Prompt', 'Random AI story', 'Scary Story', 'Funny Story', 'Love Story', 'Motivational Story', 'Inspirational Story', 'Sad Story', 'Adventure Story', 'Mystery Story', 'Horror Story', 'Science Fiction Story', 'Fantasy Story', 'Historical Fiction Story', 'Thriller Story', 'Drama Story', 'Romantic Comedy Story', 'Action Story', 'Superhero Story'];
    const [selectedOption, setSelectedOption] = useState();
    return(
        <div>
            <h2 className='font-bold text-2xl text-purple-600'>Content</h2>
            <p className='text-gray-500'>Select topic of your video</p>

            <Select onValueChange={(value) => {setSelectedOption(value)
                value!='Custom Prompt' && onUserSelect('topic', value)
            }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Content type" />
            </SelectTrigger>
            <SelectContent>
                {options.map((item, index) => (
                    <SelectItem value={item} key={index}>{item}</SelectItem>
                ))}
            </SelectContent>
            </Select>

            {selectedOption=='Custom Prompt' && (
                <Textarea className={'mt-3'} placeholder='Write prompt on what you want to generate video'
                onChange={(e) => onUserSelect('topic', e.target.value)}/>
            )}
        </div>
    )
}

export default SelectTopic