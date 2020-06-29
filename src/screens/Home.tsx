import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, List } from '../components';
import { container } from '../styles';

export const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ ...container, paddingTop: insets.top }}>
        <List header={<Header />} />
      </View>
    </>
  );
};
