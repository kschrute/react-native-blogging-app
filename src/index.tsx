import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Post, PostForm, Profile, SignUp } from './screens';
import {
  HOME,
  LOGIN,
  POST,
  POST_FORM,
  PROFILE,
  SIGN_UP,
} from './screens/types';
import { StoreProvider } from './store';

const Stack = createStackNavigator();
const noHeader = { options: { headerShown: false } };
const screenOptions = { headerBackTitle: ' ' };
const linkingOptions = {
  prefixes: ['toptalbloggingapp://'],
  config: {
    Post: 'post/:id',
  },
};

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer linking={linkingOptions}>
        <Stack.Navigator screenOptions={screenOptions} mode="modal">
          <Stack.Screen name={HOME} component={Home} {...noHeader} />
          <Stack.Screen name={POST} component={Post} />
          <Stack.Screen name={PROFILE} component={Profile} />
          <Stack.Screen name={POST_FORM} component={PostForm} />
          <Stack.Screen name={SIGN_UP} component={SignUp} />
          <Stack.Screen name={LOGIN} component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
