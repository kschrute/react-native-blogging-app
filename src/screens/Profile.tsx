import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { ButtonLink, Posts } from '../components';
import { colorBackground, textHeader } from '../styles';
import { PROFILE, ScreenProps } from '.';

export const Profile = ({ navigation }: ScreenProps<typeof PROFILE>) => {
  const { user } = useAuthStore();
  const { name } = user || {};

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => <ButtonLink title="Logout" onPress={onLogout} />,
    });
  }, [navigation, name]);

  const header = (
    <View style={styles.header}>
      <Text style={textHeader}>My Posts</Text>
    </View>
  );

  const onLogout = () => navigation.navigate('Logout');

  return (
    <View style={styles.container}>
      <Posts header={header} showMyPosts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBackground,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
