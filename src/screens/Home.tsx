import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { header } from '../styles';
import { useStore } from '../store';
import { Posts } from '../components/Posts';

export const Home = () => {
  const navigation = useNavigation();
  const { auth, blog } = useStore();
  const { user } = auth;
  const { posts } = blog;
  // console.log('user', user);
  // console.log('posts', posts);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Button
          title="Add New Post"
          onPress={() => {
            navigation.navigate('AddNewPost');
          }}
        />
        <Posts />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 20,
  },
});
