"use client";

import { createContext, useRef, useContext } from "react";
import {
  createDoctorStore,
  defaultInitState,
} from "@/store/admin-store/adminDoctorStore";
import { useStore } from "zustand";
import { usePathname } from "next/navigation";

export const DoctorStoreContextAdmin = createContext(null);

export const DoctorStoreProviderAdmin = ({ children }) => {
  const pathname = usePathname();
  const currentSelection =
    pathname == "/admin/doctors" ? "doctor" : "doctorCategory";
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createDoctorStore(defaultInitState);
  }

  return (
    <DoctorStoreContextAdmin.Provider value={storeRef.current}>
      {children}
    </DoctorStoreContextAdmin.Provider>
  );
};

export const useDoctorStoreAdmin = (selector) => {
  const doctorStoreContext = useContext(DoctorStoreContextAdmin);

  if (!doctorStoreContext) {
    throw new Error(
      `useDoctorStoreAdmin must be used within Admin's DoctorStoreProvider`
    );
  }

  return useStore(doctorStoreContext, selector);
};
