import React from 'react';
import { mount } from 'enzyme';

import StreamPlayer from './index';

describe('<StreamPlayer />', () => {
    it('should render', () => {
        const renderedComponent = mount(<StreamPlayer dimensions={{ 1024: { width: 500, height: 500 } }} />);

        expect(renderedComponent).toBeTruthy();
    });
});
