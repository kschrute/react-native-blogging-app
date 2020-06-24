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
    borderRadius: 10,
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export const { header, textError, textInput } = styles;
