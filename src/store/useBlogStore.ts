import React, { useEffect, useRef } from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { PostData, PostItem } from '../types';

const LOADING = 'LOADING';
const LOADED = 'LOADED';

interface State {
  isLoading: boolean;
  posts: PostItem[] | null;
}

const initialState: State = {
  isLoading: false,
  posts: null,
};

interface LoadingAction {
  type: typeof LOADING;
}

interface LoadedAction {
  type: typeof LOADED;
  posts: PostItem[];
}

type ActionType = LoadingAction | LoadedAction;

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case LOADED:
      const { posts } = action;
      if (state.posts) {
        const loaded = posts.map((post) => {
          const existingPost =
            state.posts && state.posts.find((p) => p.id === post.id);
          return existingPost || post;
        });
        return { ...state, isLoading: false, posts: loaded };
      } else {
        return { ...state, isLoading: false, posts };
      }
    default:
      return state;
  }
};

export const useBlogStore = () => {
  const unsubscribe = useRef<() => void>();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const actions = React.useMemo(
    () => ({
      load: async () => {
        console.log('LOAD ACTION CALLED');
        dispatch({ type: 'LOADING' });
        const callback = (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
          console.log('snap', snap);
          const posts = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as PostItem[];
          console.log('LOADED', posts);
          dispatch({ type: 'LOADED', posts });
        };
        const handleError = (error: Error) => {
          console.log('error', error);
        };
        unsubscribe.current && unsubscribe.current();
        unsubscribe.current = await firestore()
          .collection('posts')
          .orderBy('published', 'desc')
          .onSnapshot(callback, handleError);
        console.log('unsubscribe', unsubscribe);
        // const snap = await firestore()
        //   .collection('posts')
        //   .orderBy('published', 'desc')
        //   .get();
        // const posts = snap.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // })) as PostData[];
        // dispatch({ type: 'LOADED', posts });
      },
      add: async (postData: PostData) => {
        console.log('postData', postData);
        const doc = await firestore().collection('posts').add(postData);
        console.log('doc', doc);
      },
    }),
    [],
  );

  useEffect(() => {
    (async () => {
      await actions.load();
      return () => {
        console.log('UNSUBSCRIBING...');
        return unsubscribe.current && unsubscribe.current();
      };
    })();
  }, []);

  return { ...state, ...actions };
};
