import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface PostData {
  author: string;
  author_id: string;
  body: string;
  cover: string;
  published: FirebaseFirestoreTypes.Timestamp;
  title: string;
}

export interface PostItem extends PostData {
  id: string;
}
