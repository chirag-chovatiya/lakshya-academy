"use client";

import { createContext, useRef, useContext } from "react";
import { createUserStore, defaultInitState } from "@/store/admin-store/user-store";
import { useStore } from "zustand";

export const UserStoreContext = createContext(null);

export const UserStoreProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createUserStore(defaultInitState);
    // storeRef.current.getState().initialize();
  }

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};

export const useUserStore = (selector) => {
  const counterStoreContext = useContext(UserStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useUserStore must be use within UserStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

