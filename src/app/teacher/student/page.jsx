"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/app-table/app-table";
import debounce from "lodash/debounce";
import { del, post } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import * as XLSX from "xlsx";
import { useUserAdminStore } from "@/providers/user-store-provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentLists() {
  const {
    users,
    changePage,
    onPageSizeChange,
    search,
    selectedData,
    onSelectionChange,
    initialize,
  } = useUserAdminStore((state) => state);

  const [level, setLevel] = useState("");

  useEffect(() => {
    onSelectionChange("users");
    if (Object.keys(users.data).length === 0) {
      initialize();
    }
  }, []);

  useEffect(() => {
    if (level) {
      selectedData(level);
    }
  }, [level, selectedData]);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "FullName" },
    { key: "attendance", title: "Attendance" },
    { key: "level", title: "Level" },
    { key: "status", title: "Status" },
    { key: "email", title: "Email" },
    { key: "phone_number", title: "Phone" },
    { key: "user_type", title: "UserType" },
  ];

  const handleSearch = useCallback(
    debounce((query) => {
      search(query);
    }, 300),
    [search]
  );

  const handleDelete = async (id) => {
    try {
      const response = await del(API.getAllUser + `/${id}`);
      if (response.success) {
        initialize();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const createAttendance = async (id, status) => {
    try {
      const response = await post(API.attendance, { studentId: id, status });
      if (response.code === 201) {
        toast.success(`Attendance created for student ${id}: ${status}`);
      } else if (response.code === 200) {
        toast.info(`Attendance updated for student ${id}: ${status}`);
      } else {
        toast.error("Failed to create attendance record");
        console.error("Failed to create attendance record:", response.message);
      }
    } catch (error) {
      toast.error("Error creating attendance record");
    }
  };

  const exportToExcel = () => {
    if (!users.data || Object.keys(users.data).length === 0) {
      toast.error("No data available for export");
      return;
    }

    const allData = Object.values(users.data).flat();

    const filteredData = allData.map((item) => {
      const row = {};

      columns.forEach((column) => {
        if (column.key === "attendance") return;

        if (column.key === "status") {
          row[column.title] = item[column.key] ? "Active" : "Inactive";
        } else {
          row[column.title] = item[column.key];
        }
      });

      return row;
    });

    const currentDate = new Date()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    const filename = `Student_Data_${currentDate}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Attendance");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <>
      <div>
        <ToastContainer />
        <Breadcrumb pageName="Student" totalData={users.totalData} />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={() => {
                  setLevel("");
                  document.getElementById("search").value = "";
                  handleSearch("");
                  initialize("users");
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
                id="pagesizeForBlog"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => onPageSizeChange(e.target.value)}
                value={users.pageSize}
              >
                {[5, 10, 20, 30, 40, 50, 100, 200, 500, 1000, 2000, 5000].map(
                  (size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  )
                )}
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
                {[...Array(12)].flatMap((_, i) => [
                  <option key={`${i + 1}`} value={`${i + 1}`}>
                    Level {i + 1}
                  </option>,
                  <option key={`${i + 1}A`} value={`${i + 1}A`}>
                    Level {i + 1}A
                  </option>,
                ])}
              </select>
            </div>
            <div className="flex-grow mt-4 sm:mt-0">
              <input
                type="text"
                id="search"
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search Here"
              />
            </div>
            <Link
              href="../../teacher/student/create"
              className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            >
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
              <span>Add New</span>
            </Link>
          </div>
        </div>

        <Table
          columns={columns}
          data={users.data[users.page] || []}
          editLinkPrefix="../../teacher/student/edit"
          deleteHandler={handleDelete}
          editButtonVisible={true}
          createAttendance={createAttendance}
        />

        <Pagination data={users} changePage={changePage} />
      </div>
    </>
  );
}
