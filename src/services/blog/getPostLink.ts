import { PostItem } from './types';

export const getPostLink = (post: PostItem) =>
  `bloggingapp://post/${post.id}`;
