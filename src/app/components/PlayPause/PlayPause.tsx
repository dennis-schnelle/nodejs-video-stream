import * as React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { MdPlayArrow, MdPause } from 'react-icons/md';

type PlayPauseProps = {
    isPlaying?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

/**
 * TODO: Make this configurable
 */
const iconStyle = {
    size: `1.8em`,
    color: `#FFFFFF`,
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px 5px;
`;

const PlayPause: React.FunctionComponent<PlayPauseProps> = ({ isPlaying, onClick }) => {
    return (
        <div onClick={onClick}>
            <Container>
                <IconContext.Provider value={iconStyle}>
                    {isPlaying && <MdPause />}
                    {!isPlaying && <MdPlayArrow />}
                </IconContext.Provider>
            </Container>
        </div>
    );
};

export default PlayPause;
