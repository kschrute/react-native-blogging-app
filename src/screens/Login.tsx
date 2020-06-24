import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTextInput } from '../hooks/useTextInput';
import { textError, textInput } from '../styles';
import auth from '@react-native-firebase/auth';

export const Login = () => {
  const navigation = useNavigation();

  const [error, setError] = useState();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={textError}>{error}</Text>}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        {...emailInputProps}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        {...passwordInputProps}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    ...textInput,
  },
});
