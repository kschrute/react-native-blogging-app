import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  colorLightGray,
  colorSecondary,
  textError,
  textInput,
} from '../styles';
import { useTextInput } from '../hooks/useTextInput';
import { useStore } from '../store';
import { ButtonLink, ButtonRegular } from '../components';
import { HOME, LOGIN, ScreenProps, SIGN_UP } from '.';

export const Login = ({ navigation }: ScreenProps<typeof LOGIN>) => {
  const { auth } = useStore();
  const [error, setError] = useState();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      await auth.login(email, password);
      navigation.navigate(HOME);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const signUp = () => navigation.navigate(SIGN_UP);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={88}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.inner}>
        <View style={styles.top}>
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
        </View>
        <View style={styles.bottom}>
          <ButtonRegular
            title="Login"
            disabled={isLoading}
            onPress={login}
          />
          <ButtonLink
            color={colorSecondary}
            title="Don't have an account? Sign Up"
            onPress={signUp}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightGray,
  },
  inner: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  top: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
