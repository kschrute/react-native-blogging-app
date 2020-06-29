import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useStore } from '../../store';
import { Teaser } from './Teaser';
import { PostItem } from '../../services/blog/types';
import { AddPostButton } from './AddPostButton';
import { NoPostsYet } from './NoPostsYet';

interface Props {
  header: any;
  showMyPosts?: boolean;
}

export const List = ({ header, showMyPosts = false }: Props) => {
  const { auth, blog } = useStore();
  const { user } = auth;
  const { posts, isLoading } = blog;

  const data =
    showMyPosts && user ? posts.filter((p) => p.author_id === user.id) : posts;

  const headerComponent =
    !isLoading && data && !data.length ? <NoPostsYet /> : header;

  const renderItem = ({ item }: { item: PostItem }) => <Teaser post={item} />;

  return (
    <View style={styles.container}>
      <AddPostButton />
      <FlatList
        ListHeaderComponent={headerComponent}
        data={data}
        keyExtractor={(post) => post.id}
        refreshing={isLoading}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={blog.loadMore}
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
