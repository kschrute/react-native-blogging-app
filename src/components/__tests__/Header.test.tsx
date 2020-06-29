import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from '../Header';
import navigation from '@react-navigation/native';
import { mockStore } from '../../__mocks__/store';

jest.mock('@react-native-firebase/auth', () => jest.fn());
jest.mock('@react-native-firebase/firestore', () => jest.fn());
jest.mock('@react-navigation/native', () => jest.fn());
// @ts-ignore
navigation.useNavigation = jest.fn(() => ({ navigate: jest.fn() }));

describe('Header', () => {
  beforeEach(() => {
    mockStore.mockClear();
  });

  it('renders correctly', () => {
    const component = renderer.create(<Header />);
    expect(component).toMatchSnapshot();
  });
});
