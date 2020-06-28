import React, { useEffect, useRef } from 'react';
import { addPost, subscribeToPosts, updatePost } from '../services/blog';
import { PostData, PostItem } from '../services/blog/types';

const LOADING = 'LOADING';
const LOADED = 'LOADED';

interface State {
  isLoading: boolean;
  posts: PostItem[];
}

const initialState: State = {
  isLoading: false,
  posts: [],
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
            state.posts &&
            state.posts.find(
              (p) => p.id === post.id && p.published.isEqual(post.published),
            );
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
        const callback = (posts: PostItem[]) =>
          dispatch({ type: 'LOADED', posts });
        unsubscribe.current && unsubscribe.current();
        unsubscribe.current = await subscribeToPosts(callback);
      },
      add: async (data: PostData) => {
        await addPost(data);
      },
      update: async (post: PostItem, data: PostData) => {
        await updatePost(post, data);
        await actions.load();
      },
    }),
    [],
  );

  useEffect(() => {
    (async () => {
      await actions.load();
      return () => {
        return unsubscribe.current && unsubscribe.current();
      };
    })();
  }, []);

  return { ...state, ...actions };
};
