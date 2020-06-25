import React, { useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface State {
  isLoggedIn: boolean | null;
  user: FirebaseAuthTypes.User | null;
}

const initialState: State = {
  isLoggedIn: null,
  user: null,
};

const storeContext = React.createContext<any>(null);

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, user: action.user };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: any) => {
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
            user: user,
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

  return (
    <storeContext.Provider value={{ ...state, ...actions }}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
