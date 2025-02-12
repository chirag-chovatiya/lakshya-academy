"use client";
import React, { useCallback, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Pagination from "@/components/Pagination";
import { useTestAdminStore } from "@/providers/test-store-provider";
import debounce from "lodash/debounce";
import Table from "@/components/app-table/app-table";
import { del, post } from "@/service/api";
import { API } from "@/service/constant/api-constant";

export default function StudentLists() {
  const {
    test,
    changePage,
    onPageSizeChange,
    search,
    onSelectionChange,
    initialize,
  } = useTestAdminStore((state) => state);

  useEffect(() => {
    onSelectionChange("test");
    if (Object.keys(test.data).length === 0) {
      initialize();
    }
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "teacher_name", title: "TeacherName" },
    { key: "level", title: "Student Level" },
    { key: "addition", title: "Addition" },
    { key: "subtraction", title: "Subtraction" },
    { key: "multiplication", title: "Multiplication" },
    { key: "division", title: "Division" },
    { key: "totalQuestion", title: "Total Questions" },
    { key: "status", title: "Test Status" },
    { key: "createdAt", title: "Created Date" },
  ];

  const formatTestData = (data) => {
    return data.map((item) => ({
      ...item,
      addition: item.addition.length,
      subtraction: item.subtraction.length,
      multiplication: item.multiplication.length,
      division: item.division.length,
      totalQuestion:
        item.addition.length +
        item.subtraction.length +
        item.multiplication.length +
        item.division.length,
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-GB")
        : "N/A",
    }));
  };

  const formattedData = formatTestData(test.data[test.page] || []);

  const deleteTest = async (id) => {
    try {
      const response = await del(API.getAllTest + `/${id}`);
      initialize("test");
      return response;
    } catch (error) {
      console.error("Error deleting test data:", error);
    }
  };

  const updateStatusById = async (id, newStatus) => {
    try {
      const response = await post(API.getAllTest + `/${id}`, {
        status: newStatus,
      });
      console.log(response);
      if (response.code === 200) {
        initialize("test");
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearch = useCallback(
    debounce((query) => {
      search(query);
    }, 300),
    [search]
  );

  return (
    <>
      <div>
        <Breadcrumb pageName="Student Test" totalData={test.totalData} />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4 justify-between w-full">
              <div className="flex items-center gap-4">
                <button
                  className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onClick={() => {
                    initialize("test");
                  }}
                >
                  <span>
                    <i className="fa-solid fa-arrows-rotate"></i>
                  </span>
                  <span>Refresh</span>
                </button>
                <select
                  id="pagesizeForBlog"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  onChange={(e) => onPageSizeChange(e.target.value)}
                  value={test.pageSize}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="flex-grow mt-4 sm:mt-0">
                <input
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  id="search"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  placeholder="Search Here"
                />
              </div>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={formattedData}
          deleteHandler={deleteTest}
          isStatusActive={true}
          updateStatusById={updateStatusById}
        />
        <Pagination data={test} changePage={changePage} />
      </div>
    </>
  );
}
