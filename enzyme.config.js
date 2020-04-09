/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// Because jsdom has not implemented scrollIntoView on html elements yet
window.HTMLElement.prototype.scrollIntoView = () => {};
