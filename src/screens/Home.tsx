import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colorBackground, colorPrimary, iconButton } from '../styles';
import { Header, Posts } from '../components';
import { Icon } from 'react-native-elements';
import { useStore } from '../store';

export const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { auth } = useStore();
  const { user } = auth;

  const onPress = () => {
    return user
      ? navigation.navigate('PostForm')
      : navigation.navigate('SignUp', { isTryingToPost: true });
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
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
            onPress={onPress}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBackground,
  },
  scrollView: {
    padding: 20,
  },
});
