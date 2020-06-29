import firestore from '@react-native-firebase/firestore';
import { transformPostDoc } from './transformPostDoc';
import { PostItem } from './types';

export const loadPosts = async (
  limit: number = 25,
  startAfterId: string | null = null,
): Promise<PostItem[]> => {
  let query = firestore()
    .collection('posts')
    .orderBy('published', 'desc')
    .limit(limit);
  if (startAfterId) {
    const doc = await firestore().collection('posts').doc(startAfterId).get();
    query = query.startAfter(doc);
  }
  const snap = await query.get();
  return snap.docs.map((doc) => transformPostDoc(doc));
};
