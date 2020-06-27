import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { useAuthStore } from '../store/useAuthStore';

type Props = StackScreenProps<RootStackParamList, 'Post'>;

export const Profile = ({ navigation }: Props) => {
  const { user } = useAuthStore();
  const { name } = user || {};

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  return (
    <View style={styles.container}>
      {/*<Text>Profile</Text>*/}
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
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
});
