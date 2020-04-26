import React from 'react';
import { mount } from 'enzyme';

import Timeline from './index';

describe('<StreamPlayer />', () => {
    it('should render', () => {
        const renderedComponent = mount(<Timeline end={20} current={3} />);

        expect(renderedComponent).toBeTruthy();
    });
});
