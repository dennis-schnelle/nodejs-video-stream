import * as React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import StreamPlayer from 'components/StreamPlayer';

const AppWrapper = styled.div`
    padding: 50px 100px;
`;

const App = () => (
    <AppWrapper>
        <Helmet defaultTitle="Video Streaming with Node.js & React in TS" />
        <Header />
        <StreamPlayer />
    </AppWrapper>
);

export default App;
