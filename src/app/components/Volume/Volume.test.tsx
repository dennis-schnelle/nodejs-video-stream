import React from 'react';
import { mount } from 'enzyme';

import Volume from './index';

describe('<StreamPlayer />', () => {
    it('should render', () => {
        const renderedComponent = mount(<Volume />);

        expect(renderedComponent).toBeTruthy();
    });
});
