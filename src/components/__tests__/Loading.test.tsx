import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Loading />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with custom state', () => {
    const component = renderer.create(<Loading state="Doing something..." />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when set to loading by default', () => {
    const component = renderer.create(<Loading isLoading={true} />);
    expect(component).toMatchSnapshot();
  });
});
