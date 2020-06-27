import { transformPostDoc } from './transformPostDoc';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { PostItem } from './types';

type Callback = (posts: PostItem[]) => void;

export const subscribeToPosts = async (
  callback: Callback,
): Promise<() => void> => {
  const firebaseCallback = (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
    const posts = snap.docs.map((doc) => transformPostDoc(doc));
    callback(posts);
  };
  const handleError = (e: Error) => {
    throw e;
  };
  return firestore()
    .collection('posts')
    .orderBy('published', 'desc')
    .onSnapshot(firebaseCallback, handleError);
};
