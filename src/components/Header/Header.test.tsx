import React from 'react';
import { mount } from 'enzyme';

import Header from './index';

describe('<Header />', () => {
    it('should render', () => {
        const renderedComponent = mount(<Header />);

        expect(renderedComponent).toBeTruthy();
    });
});
