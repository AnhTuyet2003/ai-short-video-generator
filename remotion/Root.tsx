import React from "react";
import { Composition } from "remotion";
import RemotionVideo from "../app/dashboard/_component/RemotionVideo";

function RemotionRoot() {
    return (
        <>
            <Composition
                id="Empty"
                component={RemotionVideo}
                durationInFrames={60}
                fps={30}
                width={1280}
                height={720}
                defaultProps={{
                    script: "",
                    audioFileUrl: "",
                    captions: [],
                    imageList: []
                }}
            />

        </>
    )
}

export default RemotionRoot;