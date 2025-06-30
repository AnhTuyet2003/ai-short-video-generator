import React from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import CustomLoading from './CustomLoading';

function ExportButton({
    videoId,
    videoData,
    fontSize,
    fontFamily,
    color,
    animationType,
    bgAnimationType,
    sticker,
    stickerWidth,
    stickerHeight,
    selectedMusic,
    screenSize
}) {
    const [loading, setLoading] = React.useState(false);

    const exportVideo = async () => {
        setLoading(true);
        try {
            const exportData = {
                ...videoData,
                fontSize,
                fontFamily,
                color,
                animationType,
                bgAnimationType,
                sticker,
                stickerWidth,
                stickerHeight,
                musicFile: selectedMusic,
                width: screenSize?.width || 600,
                height: screenSize?.height || 340,
            };
            await axios.post('/api/render', {
                videoId,
                videoData: exportData
            });
            setLoading(false);
            toast.success('Your video is Exporting! Please wait a moment.');
        } catch (e) {
            setLoading(false);
            alert('Export failed: ' + (e?.message || 'Unknown error'));
        }
    };

    return (
        <div>
            <CustomLoading loading={loading} />
            <Button variant="primary" onClick={exportVideo}>Export</Button>
        </div>
    );
}

export default ExportButton;