"use client";

import { createContext, useRef, useContext } from "react";
import { createDoctorStore, defaultInitState } from "@/store/doctor-store";
import { useStore } from "zustand";

export const DoctorStoreContext = createContext(null);

export const DoctorStoreProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createDoctorStore(defaultInitState);
    storeRef.current.getState().initialize();
  }

  return <DoctorStoreContext.Provider value={storeRef.current}>{children}</DoctorStoreContext.Provider>;
};

export const useDoctorStore = (selector) => {
  const counterStoreContext = useContext(DoctorStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useDoctorStore must be use within DoctorStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

