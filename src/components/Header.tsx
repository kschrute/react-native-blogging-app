import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colorSecondary, textHeader } from '../styles';
import { useStore } from '../store';
import { Icon } from 'react-native-elements';
import { ButtonLink } from './ButtonLink';
import { LOGIN, PROFILE } from '../screens/types';

export const Header = () => {
  const navigation = useNavigation();
  const { auth } = useStore();
  const { user } = auth;

  const onPressProfile = () => navigation.navigate(PROFILE);
  const onPressLogin = () => navigation.navigate(LOGIN);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={textHeader}>All Posts</Text>
        </View>
        <View>
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
          {!user && <ButtonLink title="Login" onPress={onPressLogin} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
});
