import React from 'react';
import { Button } from 'react-native-elements';
import { colorPrimary } from '../styles';
import { StyleSheet } from 'react-native';

interface Props {
  title: string;
  color?: string;
  onPress: () => any;
}

export const ButtonLink = ({ title, color, onPress }: Props) => {
  return (
    <Button
      title={title}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      titleStyle={{
        ...styles.titleStyle,
        color: color || colorPrimary,
      }}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  containerStyle: {
    padding: 10,
    alignSelf: 'stretch',
  },
  titleStyle: {
    fontSize: 18,
  },
});
