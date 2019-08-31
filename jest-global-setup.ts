import * as Enzyme from 'enzyme';
// tslint:disable-next-line: import-name
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter(),
});
