import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = () => (
    <Container>
        <h1>Video Streaming with node.js</h1>
    </Container>
);

export default Header;
