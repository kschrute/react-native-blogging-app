import invariant from 'invariant';
import ImageResizer from 'react-native-image-resizer';
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';
import { PostData, PostItem } from '../services/blog/types';
import firestore from '@react-native-firebase/firestore';
import { HOME } from '../screens';
import { useStore } from '../store';
import { useNavigation } from '@react-navigation/native';

export const useSavePost = () => {
  const navigation = useNavigation();
  const { auth, blog } = useStore();
  const { user } = auth;

  return async (
    title: string,
    body: string,
    cover: string,
    post: PostItem | undefined,
  ) => {
    invariant(user, 'You need to be logged in to add or edit posts');
    invariant(title, 'Post title is required');

    let url = post ? post.cover : '';
    if (cover && post?.cover !== cover) {
      const resizedImage = await ImageResizer.createResizedImage(
        cover,
        600,
        600,
        'JPEG',
        60,
      );

      const ext = cover.split('.').pop();
      const filename = `${uuidv4()}.${ext}`;
      const file = storage().ref(`covers/${filename}`);
      await file.putFile(resizedImage.uri);
      url = await file.getDownloadURL();
    }

    const data: PostData = {
      author: user.name,
      author_id: user.id,
      cover: url,
      published: firestore.Timestamp.now(),
      title,
      body,
    };

    if (post) {
      await blog.update(post, data);
    } else {
      await blog.add(data);
    }
    navigation.navigate(HOME);
  };
};
