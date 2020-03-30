import React from 'react';
import { mount } from 'enzyme';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { App } from '@src/App.jsx';

// NOTE: Superficial test for setting up CI
describe('App.jsx', () => {
  it('renders with main div and switch for routes', () => {
    const wrapper = mount(<Router><App staticContext={{}} /></Router>);

    expect(wrapper.exists('.App')).toBeTruthy();
    expect(wrapper.find(Switch)).toHaveLength(1);
  });
});
