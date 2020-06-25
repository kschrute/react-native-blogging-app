import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Demo } from './screens/Demo';
import { Post } from './screens/Post';
import { SignUp } from './screens/SignUp';
import { Login } from './screens/Login';
import { Logout } from './screens/Logout';
import { AddNewPost } from './screens/AddNewPost';
import { Button } from 'react-native';
import { Home } from './screens/Home';
import { StoreProvider } from './store';
import { PostData } from './types';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Post: { post: PostData };
  SignUp: undefined;
  Login: undefined;
  Logout: undefined;
  Demo: undefined;
};

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen
            name="AddNewPost"
            component={AddNewPost}
            options={({ navigation, route }) => ({
              title: 'Add New Post',
              headerLeft: () => (
                <Button
                  onPress={() => navigation.goBack()}
                  title="Cancel"
                  // color="#00cc00"
                />
              ),
            })}
          />
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
    </StoreProvider>
  );
}
