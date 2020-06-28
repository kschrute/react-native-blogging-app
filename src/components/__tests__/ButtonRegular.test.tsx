import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonRegular } from '../ButtonRegular';

describe('ButtonRegular', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <ButtonRegular title="title" onPress={() => {}} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with custom color', () => {
    const component = renderer.create(
      <ButtonRegular title="title" color="white" onPress={() => {}} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const component = renderer.create(
      <ButtonRegular title="title" disabled={true} onPress={() => {}} />,
    );
    expect(component).toMatchSnapshot();
  });
});
