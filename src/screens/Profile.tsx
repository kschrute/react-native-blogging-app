import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonLink, Loading, Posts } from '../components';
import { useStore } from '../store';
import { container, textHeader } from '../styles';
import { HOME, PROFILE, ScreenProps } from './types';

export const Profile = ({ navigation }: ScreenProps<typeof PROFILE>) => {
  const { auth } = useStore();
  const { user } = auth;
  const { name } = user || {};
  const [isLoading, setIsLoading] = useState(false);

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

  const onLogout = async () => {
    setIsLoading(true);
    await auth.logout();
    setIsLoading(false);
    navigation.navigate(HOME);
  };

  return (
    <View style={container}>
      <Loading state={'Logging out...'} isLoading={isLoading} />
      <Posts header={header} showMyPosts />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
