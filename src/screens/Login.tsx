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
import { HOME, LOGIN, ScreenProps } from '.';

export const Login = ({ navigation }: ScreenProps<typeof LOGIN>) => {
  const { auth } = useStore();

  const [error, setError] = useState();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();

  const handleLogin = async () => {
    try {
      await auth.login(email, password);
      navigation.navigate(HOME);
    } catch (e) {
      setError(e.message);
    }
  };

  const onPressSignUp = () => navigation.navigate('SignUp');

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
          <ButtonRegular title="Login" onPress={handleLogin} />
          <ButtonLink
            color={colorSecondary}
            title="Don't have an account? Sign Up"
            onPress={onPressSignUp}
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
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  // inner: {
  //   flex: 1,
  //   padding: 20,
  //   // flex: 1,
  //   // justifyContent: 'space-around',
  //   justifyContent: 'center',
  // },
  inner: {
    // flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    padding: 20,
  },
  top: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    // paddingBottom: 20,
  },
});
