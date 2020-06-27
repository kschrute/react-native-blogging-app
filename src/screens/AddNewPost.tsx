import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTextInput } from '../hooks/useTextInput';
import { header, textError, textInput } from '../styles';
import { useStore } from '../store';
import { useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { PostData } from '../types/PostData';

const options = {
  title: 'Select Post Cover',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

type Props = StackScreenProps<RootStackParamList, 'AddNewPost'>;

export const AddNewPost = ({ navigation }: Props) => {
  // const navigation = useNavigation();
  const { auth, blog } = useStore();
  const { isLoggedIn, user } = auth;

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  // const [cover, setCover] = useState<{ uri: string }>();
  const [cover, setCover] = useState<ImageSourcePropType>();
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
    if (!user) {
      return;
    }

    setIsSaving(true);

    let url = '';

    const { uri } = cover || {};
    if (uri) {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        600,
        600,
        'JPEG',
        60,
      );

      const ext = uri.split('.').pop();
      const filename = `${uuidv4()}.${ext}`;
      const file = storage().ref(`covers/${filename}`);
      // await file.putFile(uri);
      await file.putFile(resizedImage.uri);
      url = await file.getDownloadURL();
    }

    const post: PostData = {
      author: user.name,
      author_id: user.id,
      cover: url,
      published: firestore.Timestamp.now(),
      title,
      body,
    };
    await blog.add(post);
    console.log('post', post);

    setIsSaving(false);

    // const doc = await firestore().collection('posts').add(post);
    // console.log('doc', doc);
    navigation.navigate('Home');
  };

  const handleImage = async () => {
    console.log('IMAGE');
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setCover(source);
      }
    });
    // await uploadImage();
  };

  const uploadImage = async () => {
    const { uri } = cover || {};
    console.log('uri', uri);
    console.log(uuidv4());
    const ext = uri.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    console.log(filename);

    console.log('cover', cover);

    // const res = await ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath);
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      800,
      800,
      'JPEG',
      80,
    );
    console.log('resizedImage', resizedImage);

    const file = storage().ref(`covers/${filename}`);
    // const res = await file.putFile(uri);
    const res = await file.putFile(resizedImage.uri);
    const url = await file.getDownloadURL();

    console.log('res', res);
    console.log('url', url);
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

            <Button title="Upload Cover Image" onPress={uploadImage} />

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
            {cover && <Image source={cover} style={styles.cover} />}
            <Text>{JSON.stringify(cover)}</Text>
            <Button title="Select Cover Image" onPress={handleImage} />
            <Button
              title={isSaving ? 'Saving...' : 'Post'}
              onPress={handlePost}
            />
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
  cover: {
    flex: 1,
    // width: '100%',
    // height: 200,
    resizeMode: 'contain',
  },
  scrollView: {
    padding: 20,
  },
  textInputPostBody: {
    ...textInput,
    minHeight: 200,
  },
});
