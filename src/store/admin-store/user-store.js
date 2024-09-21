import { getAllUserData } from "@/service/auth-api";
import { createStore } from "zustand/vanilla";

export const defaultInitState = {
  users: {
    data: {},
    page: 1,
    totalPages: 0,
    totalData: 0,
    pageSize: 2,
    loading: true,
    error: null,
    hasMoreData: true,
  },
};

async function fetchDataAndSetState(set, get) {
  const { page, pageSize } = get().users;

  try {
    const url = `?page=${page}&pageSize=${pageSize}`;
    const { data, code } = await getAllUserData(url);

    if (code === 200 || code === 201) {
      const hasMoreData = data.data.length > 0 && data.data.length >= 10;
      set((state) => ({
        users: {
          ...state.users,
          data: { ...state.users.data, [page]: data.data },
          loading: false,
          totalPages: data.totalPages,
          totalData: data.totalData,
          hasMoreData,
        },
      }));
    } else {
      set((state) => ({
        users: { ...state.users, error: data.message },
      }));
    }
  } catch (error) {
    set((state) => ({
      users: { ...state.users, error: error.message || error },
    }));
  }
}

export const createUsersStore = (initState = defaultInitState) =>
  createStore((set, get) => ({
    ...initState,
    initialize: async (selected = "users") => {
      set((state) => ({
        [selected]: {
          ...state[selected],
          data: [],
          page: 1,
          hasMoreData: true,
          loading: true,
        },
      }));
      await fetchDataAndSetState(set, get);
    },
    changePage: async (page) => {
      const state = get();
      if (!state.users.data[page]) {
        set({
          users: { ...state.users, page, hasMoreData: true, loading: true },
        });
        await fetchDataAndSetState(set, get);
      } else {
        set({ users: { ...state.users, page } });
      }
    },
    onSelectionChange: async (selected) => set({ selected }),
    onPageSizeChange: async (pageSize) => {
      set({
        users: {
          ...defaultInitState.users,
          pageSize,
          loading: true,
        },
      });
      await fetchDataAndSetState(set, get);
    },
    createUser: async (createData) => {
      set((state) => ({ ...state, loading: true }));
      try {
        const { code } = await createUserData(createData);
        if (code === 200 || code === 201) {
          await fetchDataAndSetState(set, get);
          toast.success("User created successfully!");
        } else {
          toast.error("Failed to create user.");
        }
        set({ loading: false, error: null });
      } catch (error) {
        toast.error(error.message || "Failed to create user.");
        set({ loading: false, error: error.message || "Failed to create user." });
      }
    },
    onError: (error) => set({ users: { ...get().users, error } }),
    noMoreData: () => set({ users: { ...get().users, hasMoreData: false } }),
  }));
