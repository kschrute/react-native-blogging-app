import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import firestore from '@react-native-firebase/firestore';
import invariant from 'invariant';
import { useTextInput } from '../hooks/useTextInput';
import {
  colorLightGray,
  colorPlaceholder,
  colorPrimary,
  textError,
  textInput,
} from '../styles';
import { useStore } from '../store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { PostData } from '../services/blog/types';
import { Icon } from 'react-native-elements';
import { deletePost } from '../services/blog';
import { ButtonLink, ButtonRegular, Loading } from '../components';
import { HOME, POST_FORM, ScreenProps } from '.';

export const PostForm = ({
  navigation,
  route,
}: ScreenProps<typeof POST_FORM>) => {
  const { params } = route;
  const { post } = params || {};
  const { auth, blog } = useStore();
  const { user } = auth;
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState<boolean | string>(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string>();
  const [cover, setCover] = useState<string>();
  const [title, titleInputProps] = useTextInput(post?.title);
  const [body, bodyInputProps] = useTextInput(post?.body);

  useEffect(() => {
    let headerTitle = 'Add New Post';
    let headerRightButton: Element | undefined;

    if (post) {
      headerTitle = `Edit ${post.title}`;
      headerRightButton = <ButtonLink title="Delete" onPress={onDelete} />;
      setCover(post.cover);
    }

    navigation.setOptions({
      title: headerTitle,
      headerRight: () => headerRightButton,
    });
  }, [navigation, post]);

  const save = async () => {
    try {
      invariant(user, 'You need to be logged in to add or edit posts');
      invariant(title, 'Post title is required');
      invariant(!isLoading, 'Post is already being saved');
      invariant(!isLoadingImage, 'Please wait till your cover image is loaded');

      setIsLoading('Saving...');

      let url = post ? post.cover : '';
      if (cover && post?.cover !== cover) {
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
        await blog.update(post, data);
      } else {
        await blog.add(data);
      }
      setIsLoading(false);
      navigation.navigate(HOME);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const handleImage = async () => {
    if (isLoadingImage) {
      return;
    }
    setIsLoadingImage(true);
    ImagePicker.showImagePicker(
      {
        title: 'Select post cover image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        setIsLoadingImage(false);
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          return setError(response.error);
        }
        setCover(response.uri);
      },
    );
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
            setIsLoading('Deleting...');
            await deletePost(post);
            setIsLoading(false);
            navigation.navigate(HOME);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
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
        <Loading
          state={(isLoading as string) || 'Saving....'}
          isLoading={!!isLoading}
        />
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
            {isLoadingImage && (
              <ActivityIndicator
                color={colorLightGray}
                size="large"
                style={styles.indicator}
              />
            )}
            {!!cover && <Image source={{ uri: cover }} style={styles.image} />}
            {!cover && (
              <View style={styles.coverSelector}>
                <Icon
                  size={80}
                  name="picture-o"
                  type="font-awesome"
                  color={colorPlaceholder}
                />
                <Text style={styles.textCover}>Upload image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <ButtonRegular
            title={isLoading ? 'Saving...' : post ? 'Save' : 'Post'}
            disabled={!!isLoading || isLoadingImage}
            onPress={save}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightGray,
  },
  inner: {
    flexGrow: 1,
    margin: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cover: {
    flex: 1,
    marginVertical: 20,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorPlaceholder,
  },
  coverSelector: {
    alignItems: 'center',
  },
  textCover: {
    color: colorPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
  textInputPostBody: {
    ...textInput,
    minHeight: 200,
  },
});
