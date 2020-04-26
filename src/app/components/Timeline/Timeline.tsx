import * as React from 'react';
import styled from 'styled-components';
import WatchTime from '../../hooks/WatchTime';

const DEFAULT_HEIGHT__PX = 3;
const ACTIVE_HEIGHT__PX = 6;
const PRIMARY_COLOR = '#e84118';

type TimelineProps = {
    videoRef: React.MutableRefObject<HTMLVideoElement>;
};

type ActivatableProps = {
    active?: boolean;
};

type TracableProps = {
    width?: number;
};

type TimelineCoordinatesProps = {
    current: number;
    buffered: number;
    duration: number;
    elementRef: React.MutableRefObject<HTMLDivElement>;
};

const containerStyle = {
    paddingTop: 5,
    cursor: `pointer`,
};

const Line = styled.div<ActivatableProps>`
    position: relative;
    z-index: 2;
    height: ${props => (props.active ? ACTIVE_HEIGHT__PX : DEFAULT_HEIGHT__PX)}px;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.2s;
    transform-origin: center;
`;

const Buffer = styled.div<ActivatableProps & TracableProps>`
    width: ${props => props.width}px;
    height: ${props => (props.active ? ACTIVE_HEIGHT__PX : DEFAULT_HEIGHT__PX)}px;
    background: rgba(255, 255, 255, 0.7);
    position: absolute;
    z-index: 2;
    transition: all 0.2s;
    transform-origin: center;
`;

const Time = styled.div<ActivatableProps & TracableProps>`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => (props.active ? ACTIVE_HEIGHT__PX : DEFAULT_HEIGHT__PX)}px;
    background: ${PRIMARY_COLOR};
    z-index: 3;
    transition: all 0.2s;
    transform-origin: center;
`;

const TimelineCoordinates = (props: TimelineCoordinatesProps): [number, number] => {
    const [currentTimeWidth, setCurrentTimeWidth] = React.useState<number>(0);
    const [currentBufferWidth, setCurrentBufferWidth] = React.useState<number>(0);

    React.useEffect(() => {
        setCurrentTimeWidth(props.elementRef.current.clientWidth * (props.current / props.duration) || 0);
        setCurrentBufferWidth(props.elementRef.current.clientWidth * (props.buffered / props.duration) || 0);
    });

    return [currentTimeWidth, currentBufferWidth];
};

const Timeline: React.FunctionComponent<TimelineProps> = (props: TimelineProps) => {
    const elementRef = React.useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [current, buffered, duration] = WatchTime({ videoElement: props.videoRef });
    const [time, buffer] = TimelineCoordinates({ current, buffered, duration, elementRef });

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => !isHovered && setIsHovered(true)}
            onMouseLeave={() => isHovered && setIsHovered(false)}
            ref={elementRef}
        >
            <Line active={isHovered}>
                <Buffer active={isHovered} width={buffer} />
                <Time active={isHovered} width={time} />
            </Line>
        </div>
    );
};

export default Timeline;
