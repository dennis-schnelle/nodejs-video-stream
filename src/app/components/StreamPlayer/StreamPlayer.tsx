import * as React from 'react';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
import Timeline from '../Timeline';
import PlayPause from '../PlayPause';
import Volume from '../Volume';
import Quality from '../Quality';
import Overlay from '../Overlay';
import Controls from '../Controls';
import PlayVideo from '../../hooks/PlayVideo';

export type StreamPlayerProps = {
    children?: React.ReactNode;
    dimensions: Dimensions;
};

export type Dimensions = {
    [key in number]: Dimension;
};

export type Dimension = {
    width: number;
    height: number;
};

const iconStyle = {
    color: '#eeeeee',
};

const Container = styled.div<Dimension>`
    position: relative;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`;

/**
 * TODO: Add responsiveness
 * @param dimensions
 */
const pickDimension = (dimensions: Dimensions) => dimensions[Object.keys(dimensions).pop()];

const StreamPlayer: React.FunctionComponent<StreamPlayerProps> = ({ dimensions, children }) => {
    const dimension = pickDimension(dimensions);
    const videoElement = React.useRef<HTMLVideoElement>(null);

    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [isPlaying, setIsPlaying] = PlayVideo({ videoElement });

    return (
        <div
            onMouseEnter={() => !isHovered && setIsHovered(true)}
            onMouseLeave={() => isHovered && setIsHovered(false)}
        >
            <IconContext.Provider value={iconStyle}>
                <Container {...dimension}>
                    <video ref={videoElement} {...dimension}>
                        {children}
                    </video>
                    <Overlay shown={isHovered}>
                        <Timeline videoRef={videoElement} />
                        <Controls>
                            <PlayPause onClick={() => setIsPlaying(!isPlaying)} isPlaying={isPlaying} />
                            <Volume />
                            <Quality />
                        </Controls>
                    </Overlay>
                </Container>
            </IconContext.Provider>
        </div>
    );
};

export default StreamPlayer;
