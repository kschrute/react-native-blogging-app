import React, { useEffect } from 'react';
import 'react-native-get-random-values';
import { ButtonLink, Loading } from '../components';
import { Form } from '../components/Posts/Form';
import { deleteConfirmation } from '../lib';
import { useDeletePost } from '../hooks/useDeletePost';
import { POST_FORM, ScreenProps } from './types';

export const PostForm = ({
  navigation,
  route,
}: ScreenProps<typeof POST_FORM>) => {
  const { params } = route;
  const { post } = params || {};
  const { isDeleting, performDelete } = useDeletePost();

  useEffect(() => {
    let headerTitle = 'Add New Post';
    let headerRightButton: Element | undefined;

    if (post) {
      headerTitle = `Edit ${post.title}`;
      headerRightButton = <ButtonLink title="Delete" onPress={onPressDelete} />;
    }

    navigation.setOptions({
      title: headerTitle,
      headerRight: () => headerRightButton,
    });
  }, [navigation, post]);

  const onPressDelete = () => deleteConfirmation(handleDelete);
  const handleDelete = () => post && performDelete(post) && goBack();
  const goBack = () => navigation.pop(2);

  return (
    <>
      <Loading state="Deleting..." isLoading={isDeleting} />
      <Form post={post} onSaved={goBack} />
    </>
  );
};
