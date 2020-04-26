import React from 'react';
import { mount } from 'enzyme';

import PlayPause from './index';

describe('<StreamPlayer />', () => {
    it('should render', () => {
        const renderedComponent = mount(<PlayPause isPlaying />);

        expect(renderedComponent).toBeTruthy();
    });
});
