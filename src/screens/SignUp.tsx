import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTextInput } from '../hooks/useTextInput';
import { textError, textInput } from '../styles';
import { useStore } from '../store';

export const SignUp = () => {
  const { auth } = useStore();
  const navigation = useNavigation();

  const [error, setError] = useState();
  const [name, nameInputProps] = useTextInput();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();

  const handleSignUp = async () => {
    try {
      await auth.signup(email, password, name);
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      // contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={88}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.inner}>
        {error && <Text style={textError}>{error}</Text>}
        <TextInput
          placeholder="Your Name"
          autoCapitalize="words"
          style={textInput}
          {...nameInputProps}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={textInput}
          {...emailInputProps}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={textInput}
          {...passwordInputProps}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  innerContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  inner: {
    flex: 1,
    padding: 20,
    // justifyContent: 'space-around',
    justifyContent: 'center',
  },
});
