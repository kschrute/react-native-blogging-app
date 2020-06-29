import { StyleSheet } from 'react-native';

export const colorPrimary = '#2196F3';
export const colorSecondary = '#607D8B';
export const colorPlaceholder = '#DDDDDD';
export const colorLightGray = '#F9F9F9';
export const colorBackground = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBackground,
  },
  growingContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  coverImage: {
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorPlaceholder,
  },
  textHeader: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  textError: {
    color: 'red',
  },
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: colorBackground,
    borderRadius: 10,
    borderColor: colorPlaceholder,
    borderWidth: 1,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  iconButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.33,
    shadowRadius: 3,
  },
  absolutePosition: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export const {
  container,
  coverImage,
  growingContainer,
  iconButton,
  textHeader,
  textError,
  textInput,
  absolutePosition,
} = styles;
