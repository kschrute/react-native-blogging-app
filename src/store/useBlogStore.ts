import React, { useEffect, useRef } from 'react';
import {
  addPost,
  deletePost,
  loadPosts,
  subscribeToPosts,
  updatePost,
} from '../services/blog';
import { PostData, PostItem } from '../services/blog/types';

const LOADING = 'LOADING';
const LOADED = 'LOADED';
const LOADED_MORE = 'LOADED_MORE';

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

interface LoadedMoreAction {
  type: typeof LOADED_MORE;
  posts: PostItem[];
}

type ActionType = LoadingAction | LoadedAction | LoadedMoreAction;

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case LOADING: {
      return { ...state, isLoading: true };
    }
    case LOADED: {
      const { posts } = action;
      if (state.posts) {
        const loaded = posts.map((post) => {
          const existingPost =
            state.posts &&
            state.posts.find(
              (p) => p.id === post.id && p.updated.isEqual(post.updated),
            );
          return existingPost || post;
        });
        return { ...state, isLoading: false, posts: loaded };
      } else {
        return { ...state, isLoading: false, posts };
      }
    }
    case LOADED_MORE: {
      const { posts } = action;
      return {
        ...state,
        isLoading: false,
        posts: posts.length ? [...state.posts, ...posts] : state.posts,
      };
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
        dispatch({ type: LOADING });
        const posts = await loadPosts();
        dispatch({ type: LOADED, posts });
      },
      loadMore: async () => {
        if (state.isLoading || !state.posts.length) {
          return;
        }
        dispatch({ type: LOADING });
        const lastPost = state.posts[state.posts.length - 1];
        const posts = await loadPosts(lastPost.id);
        dispatch({ type: LOADED_MORE, posts });
      },
      subscribe: async () => {
        const callback = (posts: PostItem[]) =>
          dispatch({ type: LOADED, posts });
        unsubscribe.current && unsubscribe.current();
        unsubscribe.current = await subscribeToPosts(callback);
      },
      add: async (data: PostData) => {
        await addPost(data);
        await actions.load();
      },
      delete: async (post: PostItem) => {
        await deletePost(post);
        await actions.load();
      },
      update: async (post: PostItem, data: PostData) => {
        await updatePost(post, data);
        await actions.load();
      },
    }),
    [state],
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
