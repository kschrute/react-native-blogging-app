import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colorPrimary, textHeader, iconButton } from '../styles';
// import { useStore } from '../store';
import { Header, Posts } from '../components';
import { Icon } from 'react-native-elements';
import { useStore } from '../store';

export const Home = () => {
  const navigation = useNavigation();
  const { auth } = useStore();
  const { isLoggedIn, user } = auth;
  // const { posts } = blog;
  // console.log('user', user);
  // console.log('posts', posts);

  const insets = useSafeAreaInsets();
  console.log('insets', insets);

  const onPress = () => {
    return isLoggedIn
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
        {/*<Posts header={renderHeader()} />*/}
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
    backgroundColor: 'white',
    // backgroundColor: 'red',
    // paddingTop: 50,
  },
  scrollView: {
    padding: 20,
  },
});
