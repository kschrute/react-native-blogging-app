import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textError: {
    color: 'red',
  },
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ddd',
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
});

export const { iconButton, header, textError, textInput } = styles;
