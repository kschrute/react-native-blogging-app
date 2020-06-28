import { PostItem } from '../services/blog/types';
import { StackScreenProps } from '@react-navigation/stack';

export const HOME = 'Home';
export const LOGIN = 'Login';
export const LOGOUT = 'Logout';
export const POST = 'Post';
export const POST_FORM = 'PostForm';
export const PROFILE = 'Profile';
export const SIGN_UP = 'SignUp';

type RootStackParamList = {
  [HOME]: undefined;
  [POST_FORM]: {
    post?: PostItem;
  };
  [POST]: {
    id?: string;
    post?: PostItem;
  };
  [SIGN_UP]: { isTryingToPost: boolean } | undefined;
  [PROFILE]: undefined;
  [LOGIN]: undefined;
  [LOGOUT]: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
