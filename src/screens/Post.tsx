import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Share, Alert } from 'react-native';
import { Button } from 'react-native';
// import Share from 'react-native-share';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { deletePost, getPostLink, loadPost } from '../services/blog';
import { PostItem } from '../types/PostItem';
import { useStore } from '../store';

type Props = StackScreenProps<RootStackParamList, 'Post'>;

export const Post = ({ navigation, route }: Props) => {
  const { auth } = useStore();
  const { user } = auth;
  const { params } = route;
  const { id } = params || {};
  const [post, setPost] = useState<PostItem | undefined>(params.post);
  const { title } = post || {};
  const isMyPost = post && user && user.id === post.author_id;

  useEffect(() => {
    navigation.setOptions({
      title,
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
    navigation.navigate('PostAdd', { post });
  };

  const onDelete = async () => {
    if (!post) {
      return;
    }
    Alert.alert(
      'Delete This Post',
      'Are you sure you want to delete this post? This actions is irreversible.',
      [
        { text: 'Cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await deletePost(post);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: true },
    );
  };

  const onShare = async () => {
    if (!post) {
      return;
    }
    try {
      const result = await Share.share({
        // message: 'React Native | A framework for building native apps using React',
        title: 'Blog Post',
        url: getPostLink(post),
      });
      console.log('result', result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const onShare = async () => {
  //   console.log('SHARE');
  //   try {
  //     const shareOptions = {
  //       title: 'Share blog post',
  //       failOnCancel: false,
  //       urls: ['xxx', 'zzz'],
  //     };
  //     const res = await Share.open(shareOptions);
  //     console.log('res', res);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text>{JSON.stringify(post, null, 2)}</Text>
      {isMyPost && <Button title="Edit" onPress={onEdit} />}
      {isMyPost && <Button title="Delete" onPress={onDelete} />}
      <Button title="Share" onPress={onShare} />
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentContainer: {
    // flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
