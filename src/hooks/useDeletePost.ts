import { PostItem } from '../services/blog/types';
import { deletePost } from '../services/blog';
import { useState } from 'react';

export const useDeletePost = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const performDelete = async (post: PostItem) => {
    setIsDeleting(true);
    await deletePost(post);
    setIsDeleting(false);
  };

  return { isDeleting, performDelete };
};
