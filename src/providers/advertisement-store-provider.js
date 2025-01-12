"use client";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createAdvertisementStore, defaultInitState } from "@/store/admin-store/advertisement-store";

export const AdvertisementStoreContext = createContext(null);

export const AdvertisementStoreProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createAdvertisementStore(defaultInitState);
  }

  return <AdvertisementStoreContext.Provider value={storeRef.current}>{children}</AdvertisementStoreContext.Provider>;
};

export const useAdvertisementAdminStore = (selector) => {
  const counterStoreContext = useContext(AdvertisementStoreContext);

  if (!counterStoreContext) {
    throw new Error(`use AdvertisementStoreProvider must be use within AdvertisementStoreProvider Provider`);
  }

  return useStore(counterStoreContext, selector);
};

