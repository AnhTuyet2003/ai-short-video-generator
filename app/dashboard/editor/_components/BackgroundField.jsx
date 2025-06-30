import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GradientColors, SolidColors } from '@/app/_data/Colors';

function BackgroundField() {
    return (
        <div>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="solid">Solid</TabsTrigger>
                    <TabsTrigger value="gradient">Gradient</TabsTrigger>
                </TabsList>
                <TabsContent value="solid">
                    <ScrollArea className="h-[200px] bg-white w-full rounded-md border p-4">
                        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                            {SolidColors.map((color, index) => (
                                <div className='w-full h-10 rounded-lg' key={color.hexCode || index}
                                    style={{
                                        backgroundColor: color.hexCode
                                    }}>

                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="gradient">
                    <ScrollArea className="h-[200px] bg-white w-full rounded-md border p-4">
                        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                            {GradientColors.map((color, index) => (
                                <div
                                    className='w-full h-10 rounded-lg'
                                    key={color.name || index}
                                    style={{
                                        background: `linear-gradient(90deg, ${color.colors[0]}, ${color.colors[1]})`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default BackgroundField;