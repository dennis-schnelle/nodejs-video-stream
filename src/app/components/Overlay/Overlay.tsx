import styled from 'styled-components';

type OverlayProps = {
    shown: boolean;
};

const Overlay = styled.div<OverlayProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: ${props => (props.shown ? 1 : 0)};
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.2);
    padding: 4px 10px;

    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        height: 50px;
        opacity: 0.7;
        background: rgb(0, 0, 0);
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.35898109243697474) 49%,
            rgba(0, 212, 255, 0) 100%
        );
        z-index: 1;
    }
`;

export default Overlay;
