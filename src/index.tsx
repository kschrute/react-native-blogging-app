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
import { PostAdd } from './screens/PostAdd';
import { Button } from 'react-native';
import { Home } from './screens/Home';
import { StoreProvider } from './store';
import { Profile } from './screens/Profile';
import { PostItem } from './services/blog/types';

export type RootStackParamList = {
  Home: undefined;
  PostAdd: {
    post?: PostItem;
  };
  Post: {
    id?: string;
    post?: PostItem;
  };
  SignUp: { isTryingToPost: boolean };
  Login: undefined;
  Logout: undefined;
  Demo: undefined;
};

const Stack = createStackNavigator();

type SignupScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;
// type SignupScreenParams = bool;
type SignupScreenParams = { isTryingToPost: boolean } | undefined;

export default function App() {
  // const ref = React.useRef();
  // const { getInitialState } = useLinking(ref, {
  //   prefixes: ['toptalbloggingapp://'],
  //   config: {
  //     screens: {
  //       Post: 'post/:sort',
  //     },
  //   },
  // });

  return (
    <StoreProvider>
      <NavigationContainer
        linking={{
          prefixes: ['toptalbloggingapp://'],
          config: {
            Post: 'post/:id',
          },
        }}>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: '',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
              headerBackTitle: '',
              headerRight: () => (
                <Button
                  title="Logout"
                  onPress={() => navigation.navigate('Logout')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="PostAdd"
            component={PostAdd}
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
