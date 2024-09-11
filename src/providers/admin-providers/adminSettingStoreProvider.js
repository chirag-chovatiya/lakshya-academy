"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createSettingStore, defaultInitState } from "@/store/admin-store/adminSettingStore";

export const SettingStoreContextAdmin = createContext(null);

export const SettingStoreProviderAdmin = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createSettingStore(defaultInitState);
  }

  return <SettingStoreContextAdmin.Provider value={storeRef.current}>{children}</SettingStoreContextAdmin.Provider>;
};

export const useSettingStoreAdmin = (selector) => {
  const counterStoreContext = useContext(SettingStoreContextAdmin);

  if (!counterStoreContext) {
    throw new Error(`useSettingStoreAdmin must be use within Admin's SettingStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

