import React from 'react';
import { Button } from 'react-native-elements';
import { colorPrimary } from '../styles';
import { StyleSheet } from 'react-native';

interface Props {
  title: string;
  color?: string;
  onPress: () => any;
}

export const ButtonRegular = ({ title, color, onPress }: Props) => {
  return (
    <Button
      title={title}
      buttonStyle={{
        backgroundColor: color || colorPrimary,
      }}
      containerStyle={styles.containerStyle}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
  },
});
