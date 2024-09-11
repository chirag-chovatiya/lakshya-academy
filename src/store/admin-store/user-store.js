import { getAllUserData } from "@/service/auth-api";
import { createStore } from "zustand/vanilla";

const defaultInitState = {
  data: [],
  page: 1,
  pageSize: 10,
  totalPages: 0,
  totalData: 0,
  hasMoreData: true,
  loading: true,
  error: null,
  
};

const fetchDataAndSetState = async (set, get) => {
  const { page, data: currentData } = get();
  try {
    const url = `?page=${page}&pageSize=10`;
    const { data, code } = await getAllUserData(url);

    if (code === 200 || code === 201) {
      const newData = page > 1 ? [...currentData, ...data.data] : data.data;

      set({
        data: newData,
        hasMoreData: data.data.length >= 10,
        loading: false,
      });
    } else {
      set({ error: data.message, loading: false });
    }
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

export const createUserStore = (initState = defaultInitState) => {
  return createStore((set, get) => ({
    ...initState,
    initialize: async () => {
      await fetchDataAndSetState(set, get);
    },
    changePage: async (page) => {
      set({ page, hasMoreData: true, loading: true });
      await fetchDataAndSetState(set, get);
    },
    onError: (error) => {
      set({ data: [], loading: false, hasMoreData: false, error });
    },
    noMoreData: () => {
      set({ hasMoreData: false, loading: false });
    },
  }));
};
