import React from 'react';
import { useAuthStore } from './useAuthStore';
import { useBlogStore } from './useBlogStore';

const storeContext = React.createContext<Store | null>(null);

interface Store {
  auth: ReturnType<typeof useAuthStore>;
  blog: ReturnType<typeof useBlogStore>;
}

export const StoreProvider = ({ children }: any) => {
  const store = {
    auth: useAuthStore(),
    blog: useBlogStore(),
  };
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
