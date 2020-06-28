import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
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
import { ButtonLink } from './components';

export type RootStackParamList = {
  Home: undefined;
  PostAdd: {
    post?: PostItem;
  };
  Post: {
    id?: string;
    post?: PostItem;
  };
  SignUp: { isTryingToPost: boolean } | undefined;
  Login: undefined;
  Logout: undefined;
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
              headerBackTitle: ' ',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
              headerBackTitle: ' ',
              headerRight: () => (
                <ButtonLink
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
                <ButtonLink
                  title="Cancel"
                  onPress={() => navigation.goBack()}
                />
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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackTitle: ' ',
            }}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
