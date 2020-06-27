import firestore from '@react-native-firebase/firestore';
import { transformPostDoc } from './transformPostDoc';
import { PostItem } from './types';

export const loadPosts = async (): Promise<PostItem[]> => {
  const snap = await firestore()
    .collection('posts')
    .orderBy('published', 'desc')
    .get();
  return snap.docs.map((doc) => transformPostDoc(doc));
};
