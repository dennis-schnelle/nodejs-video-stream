import React from 'react';
import { mount } from 'enzyme';

import Overlay from './index';

describe('<Overlay />', () => {
    it('should render', () => {
        const renderedComponent = mount(<Overlay show />);

        expect(renderedComponent).toBeTruthy();
    });
});
