import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { NoPostsYet } from '../NoPostsYet';

describe('NoPostsYet', () => {
  it('renders correctly', () => {
    const component = renderer.create(<NoPostsYet />);
    expect(component).toMatchSnapshot();
  });
});
