"use client";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { usePathname } from "next/navigation";
import { createTestimonialStore, defaultInitState } from "@/store/admin-store/adminTestimonialStore";

export const TestimonialStoreContext = createContext(null);

export const TestimonialStoreProvider = ({ children }) => {
  // const pathname = usePathname();
  // const currentSelection =
  //   pathname == "/admin/testimonial";
  // console.log(currentSelection);
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createTestimonialStore(defaultInitState);
  }

  return <TestimonialStoreContext.Provider value={storeRef.current}>{children}</TestimonialStoreContext.Provider>;
};

export const useTestimonialAdminStore = (selector) => {
  const counterStoreContext = useContext(TestimonialStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useTestimonialStore must be use within TestimonialStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

