import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header, Posts } from '../components';
import { useStore } from '../store';
import { colorPrimary, container, iconButton } from '../styles';
import { POST_FORM, SIGN_UP } from './types';

export const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { auth } = useStore();
  const { user } = auth;

  const addNewPost = () => {
    return user
      ? navigation.navigate(POST_FORM)
      : navigation.navigate(SIGN_UP, { isTryingToPost: true });
  };

  return (
    <>
      <View
        style={{
          ...container,
          paddingTop: insets.top,
        }}>
        <Posts header={<Header />} />
        <View style={iconButton}>
          <Icon
            raised
            reverse
            name="plus"
            type="font-awesome"
            color={colorPrimary}
            onPress={addNewPost}
          />
        </View>
      </View>
    </>
  );
};
