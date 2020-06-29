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
import { useTextInput } from '../hooks/useTextInput';
import {
  colorLightGray,
  colorSecondary,
  container,
  growingContainer,
  textError,
  textInput,
} from '../styles';
import { useStore } from '../store';
import { ButtonLink, ButtonRegular } from '../components';
import { LOGIN, SIGN_UP, ScreenProps } from '.';

export const SignUp = ({ route, navigation }: ScreenProps<typeof SIGN_UP>) => {
  const { auth } = useStore();
  const { params } = route;
  const { isTryingToPost } = params || {};

  const [error, setError] = useState();
  const [name, nameInputProps] = useTextInput();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();
  const [isLoading, setIsLoading] = useState(false);

  const signup = async () => {
    setIsLoading(true);
    try {
      await auth.signup(email, password, name);
      navigation.pop(2);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const login = () => navigation.navigate(LOGIN);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={88}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.top}>
          {isTryingToPost && (
            <Text>You need to sign up or log in first to be able to post.</Text>
          )}
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
        </View>
        <View style={styles.bottom}>
          <ButtonRegular
            title="Sign Up"
            disabled={isLoading}
            onPress={signup}
          />
          <ButtonLink
            color={colorSecondary}
            title="Already have an account? Login"
            onPress={login}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    backgroundColor: colorLightGray,
  },
  content: {
    ...growingContainer,
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
