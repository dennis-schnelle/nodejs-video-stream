import * as React from 'react';

type WatchTimeProps = {
    videoElement: React.MutableRefObject<HTMLVideoElement>;
};

const WatchTime = (props: WatchTimeProps): [number, number, number] => {
    const [currentTime, updateTime] = React.useState<number>(0);
    const [buffered, updateBuffered] = React.useState<number>(0);
    const [endTime, setEndTime] = React.useState<number>(0);

    React.useEffect(() => {
        const handleTimeUpdate = () => updateTime(props.videoElement.current.currentTime);
        const handleBufferUpdate = () => updateBuffered(props.videoElement.current.buffered.end(0));
        const handleDurationUpdate = () => setEndTime(props.videoElement.current.duration);

        props.videoElement.current.addEventListener(`durationchange`, handleDurationUpdate);
        props.videoElement.current.addEventListener(`timeupdate`, handleTimeUpdate);
        props.videoElement.current.addEventListener(`timeupdate`, handleBufferUpdate);

        return () => {
            props.videoElement.current.removeEventListener(`timeupdate`, handleTimeUpdate);
            props.videoElement.current.removeEventListener(`timeupdate`, handleBufferUpdate);
            props.videoElement.current.removeEventListener(`durationchange`, handleTimeUpdate);
        };
    });

    return [currentTime, buffered, endTime];
};

export default WatchTime;
