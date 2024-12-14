"use client";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createTeacherStore, defaultInitState } from "@/store/admin-store/teacher-store";

export const TeacherStoreContext = createContext(null);

export const TeacherStoreProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createTeacherStore(defaultInitState);
  }

  return <TeacherStoreContext.Provider value={storeRef.current}>{children}</TeacherStoreContext.Provider>;
};

export const useTeacherAdminStore = (selector) => {
  const counterStoreContext = useContext(TeacherStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useTeacherStore must be use within TeacherStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

