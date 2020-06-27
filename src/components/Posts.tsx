import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { useStore } from '../store';
import { PostItem } from '../types';
import { PostTeaser } from './PostTeaser';

interface Props {
  header: any;
  // posts: PostData[];
}

export const Posts = ({ header }: Props) => {
  const { blog } = useStore();
  const { posts } = blog;

  const renderItem = ({ item }: { item: PostItem }) => (
    // <PostPreview post={item} />
    <PostTeaser post={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        ListHeaderComponent={header}
        refreshing={blog.isLoading}
        showsVerticalScrollIndicator={false}
        onRefresh={blog.load}
        // renderItem={({ item }) => <Item post={item} />}
        // renderItem={({ item }) => <PostPreview post={item} />}
        renderItem={renderItem}
        keyExtractor={(post) => post.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
