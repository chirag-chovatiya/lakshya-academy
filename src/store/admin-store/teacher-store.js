import { getAllTeacherData } from "@/service/auth-api";
import { createStore } from "zustand/vanilla";
import jwt from "jsonwebtoken";


export const defaultInitState = {
  teacher: {
    data: {},
    searchQuery: null,
    teacher_id: null,
    page: 1,
    totalPages: 0,
    totalData: 0,
    pageSize: 10,
    loading: true,
    error: null,
    hasMoreData: true,
  },
};

async function fetchDataAndSetState(set, get) {
  const { page, pageSize } = get().teacher;
  const searchQuery = get().teacher.searchQuery;
  const token = localStorage.getItem("t"); 
  const decoded = jwt.decode(token);

  let teacher_id = decoded?.id;
  if (!teacher_id) {
    set((state) => ({
      teacher: {
        ...state.teacher,
        error: "Teacher ID is missing or invalid.",
        loading: false,
      },
    }));
    return;
  }
  try {
    let url = `?page=${page}&pageSize=${pageSize}&teacher_id=${teacher_id}`;
    if (searchQuery && searchQuery !== "") {
      url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }
    const { data, code } = await getAllTeacherData(url + "&");
    console.log(data)

    if (code === 200 || code === 201) {
      const hasMoreData = data.data.length > 0 && data.data.length >= 10;
      set((state) => ({
        teacher: {
          ...state.teacher,
          data: { ...state.teacher.data, [page]: data.data },
          loading: false,
          totalPages: data.totalPages,
          totalData: data.totalData,
          hasMoreData,
        },
      }));
    } else {
      set((state) => ({
        teacher: { ...state.teacher, error: data.message },
      }));
    }
  } catch (error) {
    set((state) => ({
      teacher: { ...state.teacher, error: error.message || error },
    }));
  }
}

export const createTeacherStore = (initState = defaultInitState) =>
  createStore((set, get) => ({
    ...initState,
    initialize: async (selected = "teacher") => {
      set((state) => ({
        [selected]: {
          ...state[selected],
          data: {},
          page: 1,
          hasMoreData: true,
          loading: true,
        },
      }));
      await fetchDataAndSetState(set, get);
    },
    changePage: async (page) => {
      const state = get();
      if (!state.teacher.data[page]) {
        set({
          teacher: { ...state.teacher, page, hasMoreData: true, loading: true },
        });
        await fetchDataAndSetState(set, get);
      } else {
        set({ teacher: { ...state.teacher, page } });
      }
    },
    onSelectionChange: async (selected) => set({ selected }),
    onPageSizeChange: async (pageSize) => {
      set({
        teacher: {
          ...defaultInitState.teacher,
          pageSize,
          loading: true,
        },
      });
      await fetchDataAndSetState(set, get);
    },
    search: async (searchQuery) => {
      set((state) => ({
        teacher: {
          ...state.teacher,
          searchQuery: searchQuery ? searchQuery : null,
          page: 1,
          hasMoreData: true,
          loading: true,
        },
      }));
      await fetchDataAndSetState(set, get);
    },
    getUserCount: () => {
      const state = get();
      return state.teacher.totalData;
    },
    onError: (error) => set({ teacher: { ...get().teacher, error } }),
    noMoreData: () =>
      set({ teacher: { ...get().teacher, hasMoreData: false } }),
  }));
