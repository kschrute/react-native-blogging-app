import invariant from 'invariant';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useStore } from '../store';
import { PostData, PostItem } from '../services/blog/types';

export const useSavePost = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { auth, blog } = useStore();
  const { user } = auth;

  const resizeImage = (image: string) =>
    ImageResizer.createResizedImage(image, 600, 600, 'JPEG', 60);

  const uploadImage = async (image: string) => {
    const resizedImage = await resizeImage(image);
    const ext = image.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const file = storage().ref(`covers/${filename}`);
    await file.putFile(resizedImage.uri);
    return await file.getDownloadURL();
  };

  const savePost = async (
    title: string,
    body: string,
    cover: string,
    post: PostItem | undefined,
  ) => {
    try {
      invariant(!isSaving, 'Post is already being saved');
      invariant(user, 'You need to be logged in to add or edit posts');
      invariant(title, 'Post title is required');

      setIsSaving(true);
      let url = post ? post.cover : '';
      if (cover && post?.cover !== cover) {
        url = await uploadImage(cover);
      }

      const now = firestore.Timestamp.now();
      const data: PostData = {
        author: user.name,
        author_id: user.id,
        cover: url,
        published: post ? post.published : now,
        updated: now,
        title,
        body,
      };

      if (post) {
        await blog.update(post, data);
      } else {
        await blog.add(data);
      }
      setIsSaving(false);
    } catch (e) {
      setIsSaving(false);
      throw e;
    }
  };

  return { isSaving, savePost };
};
