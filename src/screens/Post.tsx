import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Share, View, Image } from 'react-native';
import moment from 'moment';
import { getPostLink, loadPost } from '../services/blog';
import { useStore } from '../store';
import { colorPlaceholder, colorSecondary, textHeader } from '../styles';
import { PostItem } from '../services/blog/types';
import { ButtonLink, ButtonRegular } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { POST, ScreenProps } from '.';

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
      title,
      // headerRight: () => isMyPost && <Button title="Edit" onPress={onEdit} />,
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
    navigation.navigate('PostForm', { post });
  };

  // const onDelete = async () => {
  //   if (!post) {
  //     return;
  //   }
  //   Alert.alert(
  //     'Delete This Post',
  //     'Are you sure you want to delete this post? This actions is irreversible.',
  //     [
  //       { text: 'Cancel' },
  //       {
  //         text: 'Yes',
  //         onPress: async () => {
  //           await deletePost(post);
  //           navigation.navigate('Home');
  //         },
  //       },
  //     ],
  //     { cancelable: true },
  //   );
  // };

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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
      // contentContainerStyle={styles.inner}
      contentContainerStyle={{
        ...styles.inner,
        paddingBottom: insets.bottom,
      }}>
      <View>
        <Text style={textHeader}>{title}</Text>
        <Text style={styles.textAuthor}>
          {author} on {moment(published && published.toDate()).format('LL')}
        </Text>
        {!!cover && <Image source={{ uri: cover }} style={styles.image} />}
        <Text style={styles.textBody}>{body}</Text>
        {/*<Text>{JSON.stringify(post, null, 2)}</Text>*/}
      </View>
      <View style={styles.bottom}>
        {/*{isMyPost && <Button title="Edit" onPress={onEdit} />}*/}
        {/*{isMyPost && <Button title="Delete" onPress={onDelete} />}*/}
        <ButtonRegular color={colorSecondary} title="Share" onPress={onShare} />
      </View>
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
    padding: 20,
    // flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inner: {
    // flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bottom: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  image: {
    // width: '100%',
    // height: '100%',
    height: 200,
    // resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorPlaceholder,
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
