import { PostItem } from '../services/blog/types';
import { useState } from 'react';
import { useStore } from '../store';

export const useDeletePost = () => {
  const { blog } = useStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const performDelete = async (post: PostItem) => {
    setIsDeleting(true);
    await blog.delete(post);
    setIsDeleting(false);
  };

  return { isDeleting, performDelete };
};
