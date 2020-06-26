import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useTextInput } from '../hooks/useTextInput';
import { header, textError, textInput } from '../styles';
import { useStore } from '../store';
import { useFocusEffect } from '@react-navigation/native';
import { PostData } from '../types';

export const AddNewPost = () => {
  const navigation = useNavigation();
  const { auth, blog } = useStore();
  const { isLoggedIn, user } = auth;

  const [error, setError] = useState();
  const [title, titleInputProps] = useTextInput();
  const [body, bodyInputProps] = useTextInput();

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) {
        navigation.navigate('SignUp', { isTryingToPost: true });
      }
    }, [isLoggedIn]),
  );

  const handlePost = async () => {
    if (user) {
      const post: PostData = {
        author: user.name,
        author_id: user.id,
        cover: '',
        published: firestore.Timestamp.now(),
        title,
        body,
      };
      await blog.add(post);
      console.log('post', post);
      // const doc = await firestore().collection('posts').add(post);
      // console.log('doc', doc);
      navigation.navigate('Home');
    }
  };

  return (
    user && (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={88}
        enabled>
        <View style={styles.inner}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Text>Add new post as {user.name}</Text>
            {error && <Text style={textError}>{error}</Text>}

            <TextInput
              placeholder="Title"
              autoCapitalize="words"
              style={textInput}
              {...titleInputProps}
            />
            <TextInput
              placeholder="Post"
              autoCapitalize="none"
              style={styles.textInputPostBody}
              scrollEnabled={false}
              multiline
              {...bodyInputProps}
            />
            <Button title="Post" onPress={handlePost} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  inner: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  scrollView: {
    padding: 20,
  },
  textInputPostBody: {
    ...textInput,
    minHeight: 200,
  },
});
