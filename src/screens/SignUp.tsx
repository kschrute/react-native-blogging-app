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
import { colorSecondary, textError, textInput } from '../styles';
import { useStore } from '../store';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { ButtonLink, ButtonRegular } from '../components';

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUp = ({ route }: Props) => {
  const { auth } = useStore();
  const navigation = useNavigation();
  const { params } = route;
  const { isTryingToPost } = params || {};

  const [error, setError] = useState();
  const [name, nameInputProps] = useTextInput();
  const [email, emailInputProps] = useTextInput();
  const [password, passwordInputProps] = useTextInput();

  const handleSignUp = async () => {
    try {
      await auth.signup(email, password, name);
      if (isTryingToPost) {
        navigation.navigate('PostAdd');
      } else {
        navigation.navigate('Home');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onPressLogin = () => navigation.navigate('Login');

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
          <ButtonRegular title="Sign Up" onPress={handleSignUp} />
          <ButtonLink
            color={colorSecondary}
            title="Already have an account? Login"
            onPress={onPressLogin}
          />
        </View>
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
  // inner: {
  //   flex: 1,
  //   padding: 20,
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
