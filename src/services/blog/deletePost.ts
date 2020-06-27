import firestore from '@react-native-firebase/firestore';
import { PostItem } from './types';

export const deletePost = async (post: PostItem) => {
  return await firestore().collection('posts').doc(post.id).delete();
};
