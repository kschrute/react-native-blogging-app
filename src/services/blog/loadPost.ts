import { transformPostDoc } from './transformPostDoc';
import firestore from '@react-native-firebase/firestore';
import { PostItem } from './types';

export const loadPost = async (id: string): Promise<PostItem> => {
  const doc = await firestore().collection('posts').doc(id).get();
  return transformPostDoc(doc);
};
