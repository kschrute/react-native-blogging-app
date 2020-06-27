import firestore from '@react-native-firebase/firestore';
import { PostData, PostItem } from './types';

export const updatePost = async (post: PostItem, data: PostData) => {
  return await firestore().collection('posts').doc(post.id).update(data);
};
