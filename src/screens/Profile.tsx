import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { useAuthStore } from '../store/useAuthStore';
import { Posts } from '../components/Posts';
import { textHeader } from '../styles';

type Props = StackScreenProps<RootStackParamList, 'Post'>;

export const Profile = ({ navigation }: Props) => {
  const { user } = useAuthStore();
  const { name } = user || {};

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
