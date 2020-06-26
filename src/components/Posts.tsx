import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { useStore } from '../store';
import { PostItem } from '../types';

interface Props {
  header: any;
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

export const Posts = ({ header }: Props) => {
  const { blog } = useStore();
  const { posts } = blog;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        ListHeaderComponent={header}
        refreshing={blog.isLoading}
        showsVerticalScrollIndicator={false}
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
    marginVertical: 10,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
