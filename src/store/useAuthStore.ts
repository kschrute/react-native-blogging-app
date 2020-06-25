import React, { useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../types';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

interface State {
  isLoggedIn: boolean | null;
  user: User | null;
}

const initialState: State = {
  isLoggedIn: null,
  user: null,
};

interface LoginAction {
  type: typeof LOGIN;
  user: User;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type ActionType = LoginAction | LogoutAction;

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'LOGIN':
      const { user } = action;
      return { ...state, isLoggedIn: true, user };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export const useAuthStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const actions = React.useMemo(
    () => ({
      authenticate: async (user: FirebaseAuthTypes.User | null = null) => {
        if (!user) {
          const { currentUser } = await auth();
          user = currentUser;
        }
        if (user) {
          dispatch({
            type: 'LOGIN',
            user: {
              id: user.uid,
              name: user.displayName as string,
              email: user.email as string,
            },
          });
        }
      },

      signup: async (email: string, password: string, name: string) => {
        const cred = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await cred.user.updateProfile({
          displayName: name,
        });
        await actions.authenticate(cred.user);
      },

      login: async (email: string, password: string) => {
        const cred = await auth().signInWithEmailAndPassword(email, password);
        await actions.authenticate(cred.user);
      },

      logout: async () => {
        await auth().signOut();
        dispatch({
          type: 'LOGOUT',
        });
      },
    }),
    [],
  );

  useEffect(() => {
    (async () => {
      await actions.authenticate();
    })();
  }, []);

  return { ...state, ...actions };
};
