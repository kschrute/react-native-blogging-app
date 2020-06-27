import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useStore } from '../store';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';

type Props = StackScreenProps<RootStackParamList, 'Logout'>;

export const Logout = ({ navigation }: Props) => {
  const { auth } = useStore();

  useEffect(() => {
    (async () => {
      try {
        await auth.logout();
      } catch (e) {}
      // navigation.navigate('Home', { authenticated: false });
      navigation.navigate('Home');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
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
