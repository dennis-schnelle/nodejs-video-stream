import React from 'react';
import { mount } from 'enzyme';

import Controls from './index';

describe('<Controls />', () => {
    it('should render', () => {
        const renderedComponent = mount(<Controls />);

        expect(renderedComponent).toBeTruthy();
    });
});
