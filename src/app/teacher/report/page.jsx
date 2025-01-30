"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@/components/app-table/app-table";
import * as XLSX from "xlsx";
import { useReportAdminStore } from "@/providers/report-store-provider";
import Pagination from "@/components/Pagination";
import debounce from "lodash/debounce";
import { del } from "@/service/api";
import { API } from "@/service/constant/api-constant";

export default function StudentLists() {
  const {
    report,
    changePage,
    onPageSizeChange,
    onSelectionChange,
    selectedData,
    search,
    initialize,
  } = useReportAdminStore((state) => state);

  const [hwStatus, setHwStatus] = useState("");
  const [level, setLevel] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    onSelectionChange("report");
    if (!report?.data?.[report.page]?.length) {
      initialize("report");
    }
  }, []);

  useEffect(() => {
    if (hwStatus || level || createdAt || monthFilter) {
      selectedData(hwStatus, level, createdAt, monthFilter);
    }
  }, [hwStatus, level, createdAt, monthFilter, selectedData]);

  const columns = useMemo(
    () => [
      { key: "id", title: "ID" },
      { key: "studentname", title: "Student Name" },
      { key: "standerd", title: "Student Level" },
      { key: "additionMark", title: "Addition" },
      { key: "subtractionMark", title: "Subtraction" },
      { key: "multiplicationMark", title: "Multiplication" },
      { key: "divisionMark", title: "Division" },
      { key: "hwStatus", title: "HW Status" },
      { key: "result", title: "Result" },
      { key: "createdAt", title: "Date" },
    ],
    []
  );

  const transformedData = useMemo(() => {
    const currentPageData = report?.data?.[report.page] || []; 
    return currentPageData.map((item) => ({
      ...item,
      studentname: item.student?.name || "N/A",
      standerd: item.student?.level || "N/A",
      hwStatus: item.hwStatus,
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-GB")
        : "N/A",
    }));
  }, [report.data, report.page]);
  

  const deleteTest = async (id) => {
    try {
      const response = await del(API.getReport + `/${id}`);
      initialize("report");
      return response;
    } catch (error) {
      console.error("Error deleting report data:", error);
    }
  };

  const handleSearch = useCallback(
    debounce((query) => {
      search(query);
    }, 300),
    [search]
  );

  const exportToExcel = () => {
    const filteredData = transformedData.map((item) => {
      const row = {};
      columns.forEach((column) => {
        row[column.key] = item[column.key];
      });
      return row;
    });
    const currentDate = new Date().toLocaleDateString("en-GB");
    const filename = `student_data_${currentDate}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <>
      <div>
        <Breadcrumb pageName="Student Report" totalData={report.totalData} />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={() => {
                  setHwStatus("");
                  setLevel("");
                  setCreatedAt("");
                  handleSearch("");
                  initialize("report");
                }}
              >
                <span>
                  <i className="fa-solid fa-arrows-rotate"></i>
                </span>
                <span>Refresh</span>
              </button>
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={exportToExcel}
              >
                <span>Export</span>
              </button>
              <select
                id="pagesizeForReport"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => onPageSizeChange(e.target.value)}
                value={report.pageSize}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                id="hwStatusFilter"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                value={hwStatus}
                onChange={(e) => setHwStatus(e.target.value)}
              >
                <option value="">HW Status</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                id="levelFilter"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
              >
                <option value="">Choose a level</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Level {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <input
                type="date"
                id="dateSearch"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>
            <div className="mt-4 sm:mt-0">
              <input
                type="month"
                id="monthSearch"
                value={createdAt}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-grow mt-4 sm:mt-0">
            <input
              type="text"
              id="textSearch"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
              placeholder="Search Here"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          columns={columns}
          data={transformedData}
          deleteHandler={deleteTest}
        />
        <Pagination data={report} changePage={changePage} />
      </div>
    </>
  );
}
