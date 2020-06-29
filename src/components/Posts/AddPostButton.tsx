import React from 'react';
import { View } from 'react-native';
import { colorPrimary, iconButton } from '../../styles';
import { Icon } from 'react-native-elements';
import { POST_FORM, SIGN_UP } from '../../screens/types';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store';

export const AddPostButton = () => {
  const navigation = useNavigation();
  const { auth } = useStore();
  const { user } = auth;

  const addNewPost = () => {
    return user
      ? navigation.navigate(POST_FORM)
      : navigation.navigate(SIGN_UP, { isTryingToPost: true });
  };

  return (
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
  );
};
