import * as React from 'react';
import styled from 'styled-components';

const DEFAULT_HEIGHT__PX = 3;
const ACTIVE_HEIGHT__PX = 5;
const PRIMARY_COLOR = '#e84118';

type TimelineProps = {
    end: number;
    current: number;
};

type ActivatableProps = {
    active?: boolean;
};

const Line = styled.div<ActivatableProps>`
    position: relative;
    z-index: 2;
    height: ${props => (props.active ? ACTIVE_HEIGHT__PX : DEFAULT_HEIGHT__PX)}px;
    background: rgba(255, 255, 255, 0.3);
`;

const Buffer = styled.div<ActivatableProps>`
    height: ${props => (props.active ? ACTIVE_HEIGHT__PX : DEFAULT_HEIGHT__PX)}px;
    background: rgba(255, 255, 255, 0.7);
`;

const Time = styled.div<ActivatableProps>`
    height: ${props => (props.active ? ACTIVE_HEIGHT__PX : DEFAULT_HEIGHT__PX)}px;
    background: ${PRIMARY_COLOR};
`;

const Timeline: React.FunctionComponent<TimelineProps> = (props: TimelineProps) => {
    return (
        <Line>
            <Buffer />
            <Time />
        </Line>
    );
};

export default Timeline;
