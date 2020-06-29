import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import safeAreaContext from 'react-native-safe-area-context';
import navigation from '@react-navigation/native';
import { Details } from '../Details';
import { PostItem } from '../../../services/blog/types';

const mockFirebaseTimestamp = { toDate: () => new Date('2020-01-01') };
jest.mock('@react-navigation/native', () => jest.fn());
// @ts-ignore
navigation.useNavigation = jest.fn(() => ({ navigate: jest.fn() }));
jest.mock('react-native-safe-area-context', () => jest.fn());
// @ts-ignore
safeAreaContext.useSafeAreaInsets = jest.fn(() => ({
  bottom: 0,
}));

describe('Details', () => {
  it('renders correctly', () => {
    const post = {
      id: 'string-id',
      author: 'author',
      author_id: 'author-id',
      body: 'Post Body',
      cover: 'cover-url',
      published: mockFirebaseTimestamp,
      title: 'Post Title',
    };
    const component = renderer.create(
      <Details post={post as PostItem} onShare={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });
});
