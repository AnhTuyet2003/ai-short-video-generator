import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function TextAreaBox() {
    return (
        <div className='mt-3 flex gap-2 flex-col'>
            <label>Content</label>
            <Textarea className='mb-2'/>
        </div>
    );
}

export default TextAreaBox;