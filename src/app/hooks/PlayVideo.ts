import * as React from 'react';

type PlayVideoProps = {
    videoElement: React.MutableRefObject<HTMLVideoElement>;
};

const PlayVideo = (props: PlayVideoProps): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(() => {
        if (isPlaying) {
            props.videoElement.current.play();
        } else {
            props.videoElement.current.pause();
        }

        return () => props.videoElement.current.pause();
    });

    return [isPlaying, setIsPlaying];
};

export default PlayVideo;
