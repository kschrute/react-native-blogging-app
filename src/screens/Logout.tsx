import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store';

export const Logout = () => {
  const { auth } = useStore();
  const navigation = useNavigation();

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
