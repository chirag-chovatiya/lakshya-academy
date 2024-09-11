"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createContactStore, defaultInitState } from "@/store/admin-store/adminConsultationStore";
import { usePathname } from "next/navigation";

export const ContactStoreContext = createContext(null);

export const ContactStoreProvider = ({ children }) => {
  const pathname = usePathname();
  const currentSelection =
    pathname == "/admin/consultation";
  console.log(currentSelection);
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createContactStore(defaultInitState);
  }

  return <ContactStoreContext.Provider value={storeRef.current}>{children}</ContactStoreContext.Provider>;
};

export const useContactAdminStore = (selector) => {
  const counterStoreContext = useContext(ContactStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useContactStore must be use within ContactStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

