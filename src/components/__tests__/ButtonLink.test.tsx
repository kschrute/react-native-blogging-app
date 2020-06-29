import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonLink } from '../ButtonLink';

describe('ButtonLink', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <ButtonLink title="title" onPress={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with custom color', () => {
    const component = renderer.create(
      <ButtonLink title="title" color="white" onPress={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });
});
