import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import invariant from 'invariant';
import { useTextInput } from '../../hooks/useTextInput';
import {
  colorLightGray,
  colorPlaceholder,
  colorPrimary,
  container,
  coverImage,
  textError,
  textInput,
  absolutePosition,
} from '../../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import 'react-native-get-random-values';
import { ButtonRegular, Loading } from '..';
import { useNavigation } from '@react-navigation/native';
import { useSavePost } from '../../hooks/useSavePost';
import { selectImage } from '../../lib';
import { HOME } from '../../screens';
import { PostItem } from '../../services/blog/types';

interface Props {
  post: PostItem | undefined;
}

export const Form = ({ post }: Props) => {
  const savePost = useSavePost();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string>();
  const [cover, setCover] = useState<string>(post?.cover || '');
  const [title, titleInputProps] = useTextInput(post?.title);
  const [body, bodyInputProps] = useTextInput(post?.body);

  const onPressSave = async () => {
    try {
      invariant(!isLoading, 'Post is already being saved');
      invariant(!isLoadingImage, 'Please wait till your cover image is loaded');
      setIsLoading(true);
      await savePost(title, body, cover, post);
      setIsLoading(false);
      navigation.navigate(HOME);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const onPressSelectImage = async () => {
    if (isLoadingImage) {
      return;
    }
    setIsLoadingImage(true);
    try {
      const image = await selectImage();
      if (image) {
        setCover(image);
      }
    } catch (e) {
      setError(e);
    }
    setIsLoadingImage(false);
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
          ...styles.content,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}>
        <Loading state="Saving..." isLoading={isLoading} />
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
          <TouchableOpacity style={styles.cover} onPress={onPressSelectImage}>
            {isLoadingImage && (
              <ActivityIndicator
                color={colorLightGray}
                size="large"
                style={styles.activityIndicator}
              />
            )}
            {!!cover && <Image source={{ uri: cover }} style={coverImage} />}
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
            disabled={isLoading || isLoadingImage}
            onPress={onPressSave}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    backgroundColor: colorLightGray,
  },
  content: {
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
  activityIndicator: {
    ...absolutePosition,
    zIndex: 1,
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
