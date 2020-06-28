import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import invariant from 'invariant';
import { useTextInput } from '../hooks/useTextInput';
import {
  textHeader,
  textError,
  textInput,
  colorSecondary,
  colorPlaceholder,
  colorLightGray,
  colorPrimary,
} from '../styles';
import { useStore } from '../store';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { PostData } from '../services/blog/types';
import { Icon } from 'react-native-elements';
import { deletePost } from '../services/blog';
import { ButtonLink, ButtonRegular } from '../components';

type Props = StackScreenProps<RootStackParamList, 'PostAdd'>;

export const PostAdd = ({ navigation, route }: Props) => {
  // const navigation = useNavigation();
  const { params } = route;
  const { post } = params || {};
  const { auth, blog } = useStore();
  // const { isLoggedIn, user } = auth;
  const { user } = auth;
  const insets = useSafeAreaInsets();

  console.log('post', post);
  const isMyPost = post && user && user.id === post.author_id;

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>();
  // const [cover, setCover] = useState<{ uri: string }>();
  const [cover, setCover] = useState<string>();
  // const [cover, setCover] = useState<ImageSourcePropType>();
  const [title, titleInputProps] = useTextInput(post?.title);
  const [body, bodyInputProps] = useTextInput(post?.body);

  useEffect(() => {
    if (post) {
      navigation.setOptions({
        title: `Edit ${post.title}`,
        headerRight: () =>
          isMyPost && <ButtonLink title="Delete" onPress={onDelete} />,
      });
      // const source = { uri: post.cover };
      // setCover(source);
      setCover(post.cover);
    }
  }, [navigation, post]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (!isLoggedIn) {
  //       navigation.navigate('SignUp', { isTryingToPost: true });
  //     }
  //   }, [isLoggedIn]),
  // );

  const save = async () => {
    try {
      invariant(user, 'You need to be logged in to add or edit posts');
      invariant(title, 'Post title is required');

      setIsSaving(true);

      let url = post ? post.cover : '';

      if (cover && post?.cover !== cover) {
        console.log('UPLOADING IMAGE...');
        const resizedImage = await ImageResizer.createResizedImage(
          cover,
          600,
          600,
          'JPEG',
          60,
        );

        const ext = cover.split('.').pop();
        const filename = `${uuidv4()}.${ext}`;
        const file = storage().ref(`covers/${filename}`);
        // await file.putFile(uri);
        await file.putFile(resizedImage.uri);
        url = await file.getDownloadURL();
      }

      const data: PostData = {
        author: user.name,
        author_id: user.id,
        cover: url,
        published: firestore.Timestamp.now(),
        title,
        body,
      };

      if (post) {
        console.log('UPDATING...');
        console.log('post', post);
        console.log('data', data);
        await blog.update(post, data);
      } else {
        await blog.add(data);
      }
      setIsSaving(false);
      // const doc = await firestore().collection('posts').add(post);
      // console.log('doc', doc);
      navigation.navigate('Home');
    } catch (e) {
      setIsSaving(false);
      setError(e.message);
    }
  };

  const handleImage = async () => {
    console.log('IMAGE');
    ImagePicker.showImagePicker(
      {
        title: 'Select post cover image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // const source = { uri: response.uri };
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // setCover(source);
          setCover(response.uri);
        }
      },
    );
    // await uploadImage();
  };

  const onDelete = async () => {
    if (!post) {
      return;
    }
    Alert.alert(
      'Delete This Post',
      'Are you sure you want to delete this post? This actions is irreversible.',
      [
        { text: 'Cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await deletePost(post);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: true },
    );
  };

  // const uploadImage = async () => {
  //   const { uri } = cover || {};
  //   console.log('uri', uri);
  //   console.log(uuidv4());
  //   const ext = uri.split('.').pop();
  //   const filename = `${uuidv4()}.${ext}`;
  //   console.log(filename);
  //
  //   console.log('cover', cover);
  //
  //   // const res = await ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath);
  //   const resizedImage = await ImageResizer.createResizedImage(
  //     uri,
  //     800,
  //     800,
  //     'JPEG',
  //     80,
  //   );
  //   console.log('resizedImage', resizedImage);
  //
  //   const file = storage().ref(`covers/${filename}`);
  //   // const res = await file.putFile(uri);
  //   const res = await file.putFile(resizedImage.uri);
  //   const url = await file.getDownloadURL();
  //
  //   console.log('res', res);
  //   console.log('url', url);
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      // style={{
      //   ...styles.container,
      // paddingBottom: insets.bottom + 40,
      // }}
      // contentContainerStyle={{
      // marginBottom: insets.bottom + 40,
      // }}
      keyboardVerticalOffset={88}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          ...styles.inner,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
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
          <TouchableOpacity style={styles.cover} onPress={handleImage}>
            {!!cover && <Image source={{ uri: cover }} style={styles.image} />}
            {!cover && (
              <View style={styles.coverSelector}>
                <Icon
                  // raised
                  // reverse
                  size={80}
                  name="picture-o"
                  type="font-awesome"
                  color={colorPlaceholder}
                  // style={{ margin: 20 }}
                />
                <Text style={styles.textCover}>Upload image</Text>
              </View>
            )}
          </TouchableOpacity>
          {/*<Text>{JSON.stringify(cover)}</Text>*/}
          {/*<Text>{JSON.stringify(cover)}</Text>*/}
          {/*<Text>{JSON.stringify(cover)}</Text>*/}
          {/*<Text>{JSON.stringify(cover)}</Text>*/}
          {/*<Button title="Select Cover Image" onPress={handleImage} />*/}
        </View>
        <View style={styles.bottom}>
          <ButtonRegular
            title={isSaving ? 'Saving...' : post ? 'Save' : 'Post'}
            onPress={save}
          />
          {/*<Text>{' '}</Text>*/}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightGray,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingBottom: 40,
  },
  inner: {
    // flex: 1,
    flexGrow: 1,
    // flexDirection: 'column',
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // padding: 20,
    margin: 20,
  },
  bottom: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    // paddingBottom: 20,
    // marginBottom: 30,
  },
  cover: {
    flex: 1,
    marginVertical: 20,
    // backgroundColor: 'red',
  },
  image: {
    width: '100%',
    // height: '100%',
    height: 200,
    // resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorPlaceholder,
  },
  coverSelector: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  textCover: {
    color: colorPrimary,
    fontSize: 16,
    // marginLeft: 10,
    textAlign: 'center',
  },
  textInputPostBody: {
    ...textInput,
    minHeight: 200,
  },
});
