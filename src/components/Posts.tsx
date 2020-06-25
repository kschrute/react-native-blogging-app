import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useStore } from '../store';
import { PostItem } from '../types';

interface Props {
  // posts: PostData[];
}

const Item = React.memo(({ post }: { post: PostItem }) => {
  console.log(`Rendering post ${post.id}`);
  // console.log('post', post);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{post.title}</Text>
      {/*<Text>{JSON.stringify(post, null, 2)}</Text>*/}
      <Text>{post.body}</Text>
      {post.published && (
        <Text>
          {moment.utc(post.published.toDate()).fromNow()} by {post.author}
        </Text>
      )}
    </View>
  );
});

export const Posts = (props: Props) => {
  const navigation = useNavigation();
  const { auth, blog } = useStore();
  const { user } = auth;
  const { posts } = blog;

  return (
    <View style={styles.container}>
      {/*{posts && <Text>{JSON.stringify(posts, null, 2)}</Text>}*/}
      <FlatList
        data={posts}
        refreshing={blog.isLoading}
        onRefresh={blog.load}
        renderItem={({ item }) => <Item post={item} />}
        keyExtractor={(post) => post.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
