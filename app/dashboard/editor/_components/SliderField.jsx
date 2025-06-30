import { Slider } from '@/components/ui/slider';
import React from 'react';

function SliderField({ label, value, onChange, min = 0, max = 100, step = 1 }) {
    const onValueChange = (newValue) => {
        onChange?.(newValue); 
    };

    return (
        <div className='mt-3 flex flex-col gap-2'>
            {label && <label className='text-sm mb-2'>{label}</label>}
            <Slider
                value={[value]}
                max={max}
                min={min}
                step={step}
                onValueChange={(val) => onValueChange(val[0])}
            />
        </div>
    );
}

export default SliderField;