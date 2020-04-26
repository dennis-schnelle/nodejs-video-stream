import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import GoogleFontLoader from 'react-google-font-loader';

import Header from 'components/Header';
import StreamPlayer, { Dimensions } from 'components/StreamPlayer';

const videoUrl = `http://localhost/w/0/AXy37x-3`;

const playerDimensions: Dimensions = {
    1400: {
        width: 1150,
        height: 650,
    },
};

const AppWrapper = styled.div`
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AppStyle = createGlobalStyle`
    html, body {
        font-family: Roboto Mono;
    }

    h1, h2, h3 {
        font-family: Roboto;
    }
`;

const App = () => (
    <AppWrapper>
        <Helmet defaultTitle="Video Streaming with Node.js & React in TS" />
        <AppStyle />
        <GoogleFontLoader
            fonts={[
                {
                    font: 'Roboto',
                    weights: [400, '400i'],
                },
                {
                    font: 'Roboto Mono',
                    weights: [400, 700],
                },
            ]}
            subsets={['cyrillic-ext', 'greek']}
        />
        <Header />
        <StreamPlayer dimensions={playerDimensions}>
            <source src={videoUrl} type="video/mp4" />
        </StreamPlayer>
    </AppWrapper>
);

export default App;
