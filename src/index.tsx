import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Post } from './screens/Post';
import { SignUp } from './screens/SignUp';
import { Login } from './screens/Login';
import { PostForm } from './screens/PostForm';
import { Home } from './screens/Home';
import { StoreProvider } from './store';
import { Profile } from './screens/Profile';
import { HOME, LOGIN, POST, POST_FORM, PROFILE, SIGN_UP } from './screens';

const Stack = createStackNavigator();
const noHeader = { options: { headerShown: false } };
const linkingConfig = {
  prefixes: ['toptalbloggingapp://'],
  config: {
    Post: 'post/:id',
  },
};

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer linking={linkingConfig}>
        <Stack.Navigator screenOptions={{ headerBackTitle: ' ' }} mode="modal">
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
