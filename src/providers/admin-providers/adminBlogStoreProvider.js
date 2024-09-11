"use client";

import { createContext, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { createBlogStore, defaultInitState } from "@/store/admin-store/adminBlogStore";
import { useStore } from "zustand";

export const BlogStoreContextAdmin = createContext(null);

export const BlogStoreProviderAdmin = ({ children }) => {
  const pathname = usePathname();
  const currentSelection = pathname == "/admin/blogs" ? "blog" : "blogCategory";
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createBlogStore(defaultInitState);
  }

  return <BlogStoreContextAdmin.Provider value={storeRef.current}>{children}</BlogStoreContextAdmin.Provider>;
};

export const useBlogStoreAdmin = (selector) => {
  const counterStoreContext = useContext(BlogStoreContextAdmin);

  if (!counterStoreContext) {
    throw new Error(`useBlogStoreAdmin must be use within Admin's BlogStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

