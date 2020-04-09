import React from 'react';
import { mount } from 'enzyme';

import StreamPlayer from './index';

describe('<StreamPlayer />', () => {
    it('should render', () => {
        const renderedComponent = mount(<StreamPlayer />);

        expect(renderedComponent).toBeTruthy();
    });
});
