import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Layers, Smile, Type } from 'lucide-react';
import TextAreaBox from './TextAreaBox';
import SliderField from './SliderField';
import DropDown from './DropDown';
import { FontList } from '@/app/_data/List';
import ColorPicker from './ColorPickerChild';
import { SwatchBook } from 'lucide-react';
import BackgroundField from './BackgroundField';
import { animationOptions } from '@/app/_data/Animation';
import EmojiField from './EmojiField';

function FrameConfig({
    fontSize, setFontSize, fontFamily, setFontFamily, color = '#fff', setColor,
    animationType, setAnimationType, bgAnimationType, setBgAnimationType,
    sticker, setSticker,
    stickerWidth, setStickerWidth,
    stickerHeight, setStickerHeight
}) {
    const handleFontFamilyChange = (value) => {
        setFontFamily(value);
    }

    return (
        <div className='p-3 bg-gray-100 rounded-lg'>
            <Accordion type="single" collapsible>
                <AccordionItem value="text">
                    <AccordionTrigger>
                        <span className='flex gap-2 text-lg items-center'> <Type />Text</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Mock TextArea */}
                        <TextAreaBox />

                        {/* Font Family Dropdown */}
                        <DropDown
                            defaultValue={'Bungee'}
                            label={'Font Family'}
                            options={FontList}
                            onUserSelect={(_, value) => handleFontFamilyChange(value)}
                        />

                        {/* Font Size Slider */}
                        <SliderField
                            label={'Font Size'}
                            value={fontSize}
                            onChange={setFontSize}
                            min={16}
                            max={80}
                        />

                        {/* Text color picker */}
                        <ColorPicker
                            defaultColor={color}
                            handleInputChange={setColor}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="background">
                    <AccordionTrigger>
                        <span className='flex gap-2 text-lg items-center'> <SwatchBook /> Background</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <BackgroundField />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="animation">
                    <AccordionTrigger>
                        <span className='flex gap-2 text-lg items-center'> <Layers /> Animation</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Text Animation Type Dropdown */}
                        <DropDown
                            label={'Text Animation'}
                            options={animationOptions}
                            defaultValue={animationType}
                            onUserSelect={(_, value) => setAnimationType(value)}
                        />

                        {/* Background Animation Type Dropdown */}
                        <DropDown
                            label={'Background Animation'}
                            options={animationOptions}
                            defaultValue={bgAnimationType}
                            onUserSelect={(_, value) => setBgAnimationType(value)}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sticker">
                    <AccordionTrigger>
                        <span className='flex gap-2 text-lg items-center'> <Smile /> Sticker</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <EmojiField handleInputChange={setSticker} />
                        {/* Slider cho width/height sticker */}
                        <div className="mt-4">
                            <SliderField
                                label="Sticker Width"
                                value={stickerWidth}
                                onChange={setStickerWidth}
                                min={24}
                                max={256}
                            />
                            <SliderField
                                label="Sticker Height"
                                value={stickerHeight}
                                onChange={setStickerHeight}
                                min={24}
                                max={256}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>                
            </Accordion>
        </div>
    );
}

export default FrameConfig;