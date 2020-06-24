import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
  // prop: string;
}

export const Post = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Post</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
