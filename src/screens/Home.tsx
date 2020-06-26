import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { header, iconButton } from '../styles';
import { useStore } from '../store';
import { Posts } from '../components/Posts';
import { Icon } from 'react-native-elements';
import { Header } from '../components/Header';

export const Home = () => {
  const navigation = useNavigation();
  const { auth, blog } = useStore();
  const { user } = auth;
  const { posts } = blog;
  // console.log('user', user);
  // console.log('posts', posts);

  const onPress = () => {
    navigation.navigate('AddNewPost');
  };

  const renderHeader = () => {
    return (
      <>
        <Text style={header}>Blog Posts</Text>
        {user && (
          <>
            <Button
              title="Logout"
              onPress={() => {
                navigation.navigate('Logout');
              }}
            />
          </>
        )}
        {!user && (
          <Button
            title="Login"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        )}
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/*<Posts header={renderHeader()} />*/}
        <Posts header={<Header />} />
        <View style={iconButton}>
          <Icon
            raised
            reverse
            name="plus"
            type="font-awesome"
            color="#2196F3"
            onPress={onPress}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 20,
  },
});
