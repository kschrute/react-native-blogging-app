import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { header } from '../styles';

export const Posts = () => {
  const navigation = useNavigation();
  const [loadedPosts, setLoadedPostsPosts] = useState();

  useEffect(() => {
    (async () => {
      const { currentUser } = await auth();
      console.log('currentUser', currentUser);
      const snap = await firestore().collection('posts').get();
      const posts = snap.docs.map((doc) => doc.data());
      setLoadedPostsPosts(posts);
      console.log('posts', posts);
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={header}>Blog Posts</Text>

          {loadedPosts && <Text>{JSON.stringify(loadedPosts, null, 2)}</Text>}

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
  },
  scrollView: {
    padding: 10,
  },
});
