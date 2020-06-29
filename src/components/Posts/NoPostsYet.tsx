import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const NoPostsYet = () => {
  return (
    <View style={styles.container}>
      <Text>You don't have any posts yet.</Text>
      <Text> </Text>
      <Text>
        Start by tapping the Plus button at the bottom to create your first
        post.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 40,
  },
});
