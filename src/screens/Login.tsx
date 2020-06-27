import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useTextInput } from '../hooks/useTextInput';
import { textError, textInput } from '../styles';
import { useStore } from '../store';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export const Login = ({ navigation }: Props) => {
  const { auth } = useStore();

  const [error, setError] = useState();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();

  const handleLogin = async () => {
    try {
      await auth.login(email, password);
      // navigation.navigate('Home', { authenticated: true });
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
        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('SignUp')}
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
    // flex: 1,
    // justifyContent: 'space-around',
    justifyContent: 'center',
  },
});
