'use client';

import React, { ReactNode } from 'react';
import { usePostStore } from '../store';

const StoreContext = React.createContext<typeof usePostStore | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={usePostStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function useCreatePostStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("StoreProvider not found");
  return ctx;
}
