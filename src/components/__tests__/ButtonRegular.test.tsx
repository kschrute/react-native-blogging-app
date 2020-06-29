import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonRegular } from '../ButtonRegular';

describe('ButtonRegular', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <ButtonRegular title="title" onPress={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with custom color', () => {
    const component = renderer.create(
      <ButtonRegular title="title" color="white" onPress={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const component = renderer.create(
      <ButtonRegular title="title" disabled={true} onPress={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });
});
