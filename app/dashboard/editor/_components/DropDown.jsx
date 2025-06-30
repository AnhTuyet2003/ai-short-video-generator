import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function DropDown({ label, defaultValue, options = [], onUserSelect }) {
    return (
        <div className='mt-3 flex flex-col gap-2'>
            <label>{label}</label>
            <Select className='mb-2' onValueChange={(value) => {
                onUserSelect && onUserSelect('fontFamily', value)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder={defaultValue} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((item, index) => (
                        <SelectItem key={index} value={typeof item === 'object' ? item.name : item}>
                            {typeof item === 'object' ? item.name : item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default DropDown;