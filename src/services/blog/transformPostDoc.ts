import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { PostData, PostItem } from './types';

export const transformPostDoc = (
  doc:
    | FirebaseFirestoreTypes.DocumentSnapshot
    | FirebaseFirestoreTypes.QueryDocumentSnapshot,
): PostItem => {
  return {
    id: doc.id,
    ...(doc.data() as PostData),
  };
};
