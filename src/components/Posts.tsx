import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useStore } from '../store';
import { PostTeaser } from './PostTeaser';
import { PostItem } from '../services/blog/types';

interface Props {
  header: any;
  showMyPosts?: boolean;
}

export const Posts = ({ header, showMyPosts = false }: Props) => {
  const { auth, blog } = useStore();
  const { user } = auth;
  const { posts } = blog;

  const renderItem = ({ item }: { item: PostItem }) => (
    <PostTeaser post={item} />
  );

  const data =
    showMyPosts && user ? posts.filter((p) => p.author_id === user.id) : posts;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        data={data}
        keyExtractor={(post) => post.id}
        refreshing={blog.isLoading}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onRefresh={blog.load}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -10,
  },
});
