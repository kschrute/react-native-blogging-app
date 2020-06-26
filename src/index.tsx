import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
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
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Post: { post: PostData };
  SignUp: { isTryingToPost: boolean };
  Login: undefined;
  Logout: undefined;
  Demo: undefined;
};

type SignupScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;
// type SignupScreenParams = bool;
type SignupScreenParams = { isTryingToPost: boolean } | undefined;

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
            options={({ navigation }) => ({
              title: 'Add New Post',
              headerLeft: () => (
                <Button title="Cancel" onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={({ navigation, route }: any) => ({
              headerLeft: () => (
                <Button
                  title="Cancel"
                  onPress={() =>
                    route.params && route.params.isTryingToPost
                      ? navigation.navigate('Home')
                      : navigation.goBack()
                  }
                />
              ),
            })}
            // options={({
            //   navigation,
            //   route,
            // }: {
            //   route: SignupScreenParams;
            //   navigation: any;
            // }) => ({
            //   headerLeft: () => (
            //     <Button
            //       title="Cancel"
            //       onPress={() =>
            //         route.params && route.params.isTryingToPost
            //           ? navigation.navigate('Home')
            //           : navigation.goBack()
            //       }
            //     />
            //   ),
            // })}
          />
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
