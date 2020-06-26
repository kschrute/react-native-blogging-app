import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { header } from '../styles';
import { useStore } from '../store';

interface Props {
  // prop: string;
}

export const Header = (props: Props) => {
  const navigation = useNavigation();
  const { auth } = useStore();
  const { user } = auth;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={header}>Blog Posts</Text>
        </View>
        <View style={styles.right}>
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
        </View>
      </View>
      <View style={styles.header}>
        <Text>All Posts</Text>
        {user && (
          <>
            <Text>{' | '}</Text>
            <Text>{user.name}'s Posts</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  left: {
    flex: 1,
  },
  right: {
    // alignContent: 'flex-end',
  },
});
