import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPostLink, loadPost } from '../services/blog';
import { useStore } from '../store';
import {
  colorSecondary,
  container,
  coverImage,
  growingContainer,
  textHeader,
} from '../styles';
import { PostItem } from '../services/blog/types';
import { ButtonLink, ButtonRegular } from '../components';
import { POST, POST_FORM, ScreenProps } from '.';

export const Post = ({ navigation, route }: ScreenProps<typeof POST>) => {
  const { auth } = useStore();
  const insets = useSafeAreaInsets();
  const { user } = auth;
  const { params } = route;
  const { id } = params || {};
  const [post, setPost] = useState<PostItem | undefined>(params.post);
  const { title, body, cover, author, published } = post || {};
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={container}
      contentContainerStyle={{
        ...styles.content,
        paddingBottom: insets.bottom,
      }}>
      <View>
        <Text style={textHeader}>{title}</Text>
        <Text style={styles.textAuthor}>
          {author} on {moment(published && published.toDate()).format('LL')}
        </Text>
        {!!cover && <Image source={{ uri: cover }} style={coverImage} />}
        <Text style={styles.textBody}>{body}</Text>
      </View>
      <View style={styles.bottom}>
        <ButtonRegular color={colorSecondary} title="Share" onPress={onShare} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  content: {
    ...growingContainer,
    padding: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  textAuthor: {
    marginTop: 5,
    marginBottom: 20,
  },
  textBody: {
    fontSize: 18,
    marginVertical: 20,
  },
});
