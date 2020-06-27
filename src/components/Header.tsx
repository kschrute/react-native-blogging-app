import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colorPrimary, colorSecondary, header } from '../styles';
import { useStore } from '../store';
import { Icon } from 'react-native-elements';

interface Props {
  // prop: string;
}

export const Header = (props: Props) => {
  const navigation = useNavigation();
  const { auth } = useStore();
  const { user } = auth;

  const onPressProfile = () => navigation.navigate('Profile');
  // const onPressProfile = () => navigation.navigate('Logout');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={header}>All Posts</Text>
          {/*<Text>Blog Posts</Text>*/}
        </View>
        <View style={styles.right}>
          {user && (
            <>
              <Icon
                raised
                reverse
                name="user"
                size={18}
                type="font-awesome"
                color={colorSecondary}
                onPress={onPressProfile}
              />
            </>
          )}
          {!user && (
            <Button
              title="Login"
              onPress={() => {
                // navigation.navigate('Login');
                navigation.navigate('Profile');
              }}
            />
          )}
        </View>
      </View>
      {/*
      <View style={styles.row}>
        <Text>All Posts</Text>
        {user && (
          <>
            <Text>{' | '}</Text>
            <Text>{user.name}'s Posts</Text>
          </>
        )}
      </View>
*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 20,
    // paddingRight: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  left: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    // alignContent: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // textAlignVertical: 'center',
  },
  right: {
    // alignContent: 'center',
    // alignSelf: 'center',
    paddingRight: 10,
  },
});
