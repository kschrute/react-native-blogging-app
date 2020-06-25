import React, { useCallback, useEffect, useState } from 'react';
import {
  Route,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { header } from '../styles';
import { PostData } from '../types';
import { useStore } from '../store/store';

export const Home = () => {
  const store = useStore();
  const { user } = store;
  const navigation = useNavigation();
  const [loadedPosts, setLoadedPostsPosts] = useState<PostData[]>();

  useEffect(() => {
    (async () => {
      const snap = await firestore().collection('posts').get();
      const posts = snap.docs.map((doc) => doc.data()) as PostData[];
      setLoadedPostsPosts(posts);
      console.log('posts', posts);
    })();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={header}>Blog Posts</Text>

          {/*{user && <Text>{JSON.stringify(user, null, 2)}</Text>}*/}
          {loadedPosts && <Text>{JSON.stringify(loadedPosts, null, 2)}</Text>}

          <Button
            title="Add New Post"
            onPress={() => {
              navigation.navigate('AddNewPost');
            }}
          />
          <Button
            title="Show Post"
            onPress={() => {
              navigation.navigate('Post');
            }}
          />
          <Button
            title="Show Demo"
            onPress={() => {
              navigation.navigate('Demo');
            }}
          />
          <Button
            title="Signup"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
          <Button
            title="Login"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
          <Button
            title="Logout"
            onPress={() => {
              navigation.navigate('Logout');
            }}
          />
        </ScrollView>
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
