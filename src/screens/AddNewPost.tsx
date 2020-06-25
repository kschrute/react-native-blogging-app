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
import { useNavigation } from '@react-navigation/native';
import { useTextInput } from '../hooks/useTextInput';
import { header, textError, textInput } from '../styles';
import firestore from '@react-native-firebase/firestore';
import { useStore } from '../store/store';
import { PostData } from '../types';

export const AddNewPost = () => {
  const store = useStore();
  const navigation = useNavigation();

  const { user } = store;
  const [error, setError] = useState();
  const [title, titleInputProps] = useTextInput();
  const [body, bodyInputProps] = useTextInput();

  const handlePost = async () => {
    if (user) {
      const post: PostData = {
        author: user.displayName,
        author_id: user.uid,
        cover: '',
        published: new Date(),
        title,
        body,
      };
      console.log('post', post);
      const doc = await firestore().collection('posts').add(post);
      console.log('doc', doc);
      navigation.navigate('Home');
    }
  };

  return (
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
          <Text style={header}>Blog Posts</Text>
          {error && <Text style={textError}>{error}</Text>}

          {Array(1).fill(<Text key={1}>Blah</Text>)}

          <TextInput
            placeholder="Title"
            autoCapitalize="words"
            style={textInput}
            {...titleInputProps}
          />
          <TextInput
            placeholder="Post"
            autoCapitalize="none"
            style={textInput}
            scrollEnabled={false}
            multiline
            {...bodyInputProps}
          />
          <Button title="Post" onPress={handlePost} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
});
