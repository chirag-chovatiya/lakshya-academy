import { getAllReportData } from "@/service/report-api";
import { createStore } from "zustand/vanilla";

export const defaultInitState = {
  report: {
    data: {},
    hwStatus: null,
    level:null,
    createdAt:null,
    studentName:null,
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
  const hwStatus = get().report.hwStatus;
  const level = get().report.level;
  const createdAt = get().report.createdAt;
  const studentName = get().report.studentName;
  try {
    let url = `?page=${page}&pageSize=${pageSize}`;
    if (hwStatus && hwStatus != "") {
      url += `&hwStatus=${encodeURIComponent(hwStatus)}`;
    }
    if (level && level != "") {
      url += `&level=${encodeURIComponent(level)}`;
    }
    if (createdAt && createdAt != "") {
      url += `&createdAt=${encodeURIComponent(createdAt)}`;
    }
    if (studentName && studentName != "") {
      url += `&studentName=${encodeURIComponent(studentName)}`;
    }
    const { data, code } = await getAllReportData(url+'&');

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
          hwStatus: null,
          level: null,
          createdAt: null,
          studentName: null,
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
    selectedData: async (hwStatus, level, createdAt) => {
      set((state) => ({
        ...state.report,
        report: {
          ...state.report,
          hwStatus: hwStatus || null,
          level: level || null,
          createdAt: createdAt || null,
        },
      }));
      await fetchDataAndSetState(set, get);
    },
    search: async (studentName) => {
      set((state) => ({
        report: {
          ...state.report,
          studentName: studentName ? studentName : null,
          page: 1,
          hasMoreData: true,
          loading: true,
        },
      }));
      await fetchDataAndSetState(set, get);
    },
    onError: (error) => set({ report: { ...get().report, error } }),
    noMoreData: () => set({ report: { ...get().report, hasMoreData: false } }),
  }));
