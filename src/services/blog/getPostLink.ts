import { PostItem } from './types';

export const getPostLink = (post: PostItem) =>
  `toptalbloggingapp://post/${post.id}`;
