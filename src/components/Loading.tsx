import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { colorLightGray } from '../styles';

interface Props {
  state?: string;
  isLoading?: boolean;
}

export const Loading = ({ state = 'Loading...', isLoading = false }: Props) => {
  return (
    <Overlay overlayStyle={styles.overlayStyle} isVisible={isLoading}>
      <Text style={styles.text}>{state}</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayStyle: {
    backgroundColor: 'transparent',
  },
  text: {
    color: colorLightGray,
    fontSize: 33,
    textShadowColor: '#333',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
