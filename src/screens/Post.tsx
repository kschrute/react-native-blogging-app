import React, { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { getPostLink, loadPost } from '../services/blog';
import { useStore } from '../store';
import { PostItem } from '../services/blog/types';
import { ButtonLink, Loading } from '../components';
import { Details } from '../components/Posts/Details';
import { POST, POST_FORM, ScreenProps } from './types';

export const Post = ({ navigation, route }: ScreenProps<typeof POST>) => {
  const { auth } = useStore();
  const { user } = auth;
  const { params } = route;
  const { id } = params || {};
  const [post, setPost] = useState<PostItem | undefined>(params.post);
  const { title } = post || {};
  const isMyPost = post && user && user.id === post.author_id;

  useEffect(() => {
    navigation.setOptions({
      title: `Read ${title}`,
      headerRight: () =>
        isMyPost && <ButtonLink title="Edit" onPress={onEdit} />,
    });
  }, [navigation, title]);

  useEffect(() => {
    (async () => {
      if (id) {
        setPost(await loadPost(id));
      }
    })();
  }, [id]);

  const onEdit = () => {
    navigation.navigate(POST_FORM, { post });
  };

  const onShare = async () => {
    if (!post) {
      return;
    }
    await Share.share({
      title: 'Blog Post',
      url: getPostLink(post),
    });
  };

  if (!post) {
    return <Loading />;
  }

  return <Details post={post} onShare={onShare} />;
};
