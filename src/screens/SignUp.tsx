import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTextInput } from '../hooks/useTextInput';
import { textError, textInput } from '../styles';

export const SignUp = () => {
  const navigation = useNavigation();

  const [error, setError] = useState();
  const [name, nameInputProps] = useTextInput();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();

  const handleSignUp = async () => {
    try {
      const cred = await auth().createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({
        displayName: name,
        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      });
      navigation.navigate('Posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={textError}>{error}</Text>}
      <TextInput
        placeholder="Your Name"
        autoCapitalize="words"
        style={styles.textInput}
        {...nameInputProps}
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
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
