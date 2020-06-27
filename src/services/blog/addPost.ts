import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { PostData } from './types';

export const addPost = async (
  postData: PostData,
): Promise<FirebaseFirestoreTypes.DocumentReference> => {
  return await firestore().collection('posts').add(postData);
};
