import { Alert } from 'react-native';

export const deleteConfirmation = (callback: () => any) => {
  Alert.alert(
    'Delete This Post',
    'Are you sure you want to delete this post? This actions is irreversible.',
    [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: async () => await callback(),
      },
    ],
    { cancelable: true },
  );
};
