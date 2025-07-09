'use client';

import React, { ReactNode } from 'react';
import { initializeStore } from '../store';
import { Posts } from '../types';

const StoreContext = React.createContext<ReturnType<typeof initializeStore> | null>(null);

export function StoreProvider({ children, initialState }: { children: ReactNode, initialState: Posts[] }) {
  const useStore = React.useMemo(() => initializeStore({ posts: initialState }), [initialState]);
  return (
    <StoreContext.Provider value={useStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function usePostStoree() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("StoreProvider not found");
  return ctx;
}
