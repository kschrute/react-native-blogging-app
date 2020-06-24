import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Demo } from './screens/Demo';
import { Post } from './screens/Post';
import { Posts } from './screens/Posts';
import { SignUp } from './screens/SignUp';
import { Login } from './screens/Login';
import { Logout } from './screens/Logout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Demo"
          component={Demo}
          options={{
            title: 'Demo',
            headerTintColor: '#4aa3ba',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
