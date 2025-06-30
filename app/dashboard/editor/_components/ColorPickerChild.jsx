import React, { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ColorPicker from 'react-best-gradient-color-picker'

function ColorPickerChild({ defaultColor, handleInputChange }) {
    const [color, setColor] = useState(defaultColor);

    const safeOnChange = (value) => {
        setColor(value);
        handleInputChange?.(value);
    };

    return (
        <div className='mt-3 flex gap-4 items-center mb-2'>
            <label className='text-sm'>Text Color</label>
            <Popover>
                <PopoverTrigger asChild>
                    <div
                        style={{
                            backgroundColor: color,
                        }}
                        className='w-10 h-10 rounded-lg'
                    ></div>
                </PopoverTrigger>
                <PopoverContent>
                    <ColorPicker
                        value={color}
                        onChange={safeOnChange}
                        width={250}
                        height={200}
                        hideColorGuide
                        hideControls
                        hideEyeDrop
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ColorPickerChild;