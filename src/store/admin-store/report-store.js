import { getAllReportData } from "@/service/report-api";
import { createStore } from "zustand/vanilla";

export const defaultInitState = {
  report: {
    data: {},
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
  const { page, pageSize } = get().report;

  try {
    const url = `?page=${page}&pageSize=${pageSize}`;
    const { data, code } = await getAllReportData(url);

    if (code === 200 || code === 201) {
      const hasMoreData = data.data.length > 0 && data.data.length >= 10;
      set((state) => ({
        report: {
          ...state.report,
          data: { ...state.report.data, [page]: data.data },
          loading: false,
          totalPages: data.totalPages,
          totalData: data.totalData,
          hasMoreData,
        },
      }));
    } else {
      set((state) => ({
        report: { ...state.report, error: data.message },
      }));
    }
  } catch (error) {
    set((state) => ({
      report: { ...state.report, error: error.message || error },
    }));
  }
}

export const createReportStore = (initState = defaultInitState) =>
  createStore((set, get) => ({
    ...initState,
    initialize: async (selected = "report") => {
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
      if (!state.report.data[page]) {
        set({
          report: { ...state.report, page, hasMoreData: true, loading: true },
        });
        await fetchDataAndSetState(set, get);
      } else {
        set({ report: { ...state.report, page } });
      }
    },
    onSelectionChange: async (selected) => set({ selected }),
    onPageSizeChange: async (pageSize) => {
      set({
        report: {
          ...defaultInitState.report,
          pageSize,
          loading: true,
        },
      });
      await fetchDataAndSetState(set, get);
    },
    onError: (error) => set({ report: { ...get().report, error } }),
    noMoreData: () => set({ report: { ...get().report, hasMoreData: false } }),
  }));
