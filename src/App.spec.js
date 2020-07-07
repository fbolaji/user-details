import React from "react";
import { EnzymeAdapter, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from "redux-mock-store";
import App from "./App";

configure({ adapter: new Adapter() });

const store = configureStore()({});
const wrapper = shallow(<App store={store} />);

it("Should render ", () => {
	expect(wrapper.find(".userDetailsApp").length).toBe(1);
});