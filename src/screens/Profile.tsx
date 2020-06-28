import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { Posts } from '../components';
import { textHeader } from '../styles';
import { ButtonLink } from '../components';
import { PROFILE, ScreenProps } from '.';

export const Profile = ({ navigation }: ScreenProps<typeof PROFILE>) => {
  const { user } = useAuthStore();
  const { name } = user || {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonLink
          title="Logout"
          onPress={() => navigation.navigate('Logout')}
        />
      ),
    });
  }, [navigation]);

  const header = (
    <View style={styles.header}>
      <Text style={textHeader}>My Posts</Text>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  return (
    <View style={styles.container}>
      <Posts header={header} showMyPosts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
