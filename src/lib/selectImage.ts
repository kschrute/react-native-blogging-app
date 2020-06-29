import ImagePicker from 'react-native-image-picker';

export const selectImage = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(
      {
        title: 'Select post cover image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        if (response.didCancel) {
          resolve(null);
        }
        if (response.error) {
          reject(response.error);
        }
        resolve(response.uri);
      },
    );
  });
};
