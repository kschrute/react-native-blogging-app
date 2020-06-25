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
});

export const { header, textError, textInput } = styles;
