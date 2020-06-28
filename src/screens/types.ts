import { PostItem } from '../services/blog/types';
import { StackScreenProps } from '@react-navigation/stack';

export const HOME = 'Home';
export const LOGIN = 'Login';
export const POST = 'Post';
export const POST_FORM = 'PostForm';
export const PROFILE = 'Profile';
export const SIGN_UP = 'SignUp';

type RootStackParamList = {
  [HOME]: undefined;
  [LOGIN]: undefined;
  [PROFILE]: undefined;
  [SIGN_UP]: { isTryingToPost: boolean } | undefined;
  [POST]: {
    id?: string;
    post?: PostItem;
  };
  [POST_FORM]: {
    post?: PostItem;
  };
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
