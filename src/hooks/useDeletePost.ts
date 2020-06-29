import { PostItem } from '../services/blog/types';
import { HOME } from '../screens';
import { deletePost } from '../services/blog';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export const useDeletePost = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigation = useNavigation();

  const performDelete = async (post: PostItem) => {
    setIsDeleting(true);
    await deletePost(post);
    setIsDeleting(false);
    navigation.navigate(HOME);
  };

  return { isDeleting, performDelete };
};
