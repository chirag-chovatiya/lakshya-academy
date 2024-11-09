"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import FormStudentAddition from "./components/form-element";
import { useTestAdminStore } from "@/providers/test-store-provider";
import Table from "@/components/app-table/app-table";

export default function StudentLists() {
  const { test, changePage, onPageSizeChange, onSelectionChange, initialize } =
    useTestAdminStore((state) => state);

  useEffect(() => {
    onSelectionChange("test");
    if (Object.keys(test.data).length === 0) {
      initialize();
    }
  }, []);

  

  const columns = [
    { key: "id", title: "ID" },
    { key: "level", title: "Student Level" },
    { key: "type", title: "Sum Type" },
    { key: "horizontalDigits", title: "Addition Row" },
    { key: "verticalDigits", title: "Vertical Digits" },
    { key: "totalQuestion", title: "Total Addition" },
    { key: "createdAt", title: "Created Date" },
  ];

  

  const [studentAdditionObj, setStudentAdditionObj] = useState({
    visible: false,
    displayHeader: true,
    title: "Add Student Test",
    displayDefaultBtn: false,
    cancelBtnText: "Later",
    okBtnText: "Save",
  });

  const handleAddNewStudent = (id = null) => {
    setStudentAdditionObj((prevState) => ({
      ...prevState,
      title: id ? "Edit Student Test" : "Add Student Test",
      visible: true,
    }));
  };

  const handleCloseStudentForm = () => {
    setStudentAdditionObj((prevState) => ({
      ...prevState,
      visible: false,
    }));
  };

  return (
    <>
      {studentAdditionObj.visible && (
        <FormStudentAddition
          studentAdditionObj={studentAdditionObj}
          handleCloseStudentForm={handleCloseStudentForm}
        />
      )}
      <div>
        <Breadcrumb pageName="Student Test" />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white"
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
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex-grow mt-4 sm:mt-0">
              <input
                type="text"
                id="search"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search Here"
              />
            </div>
            <div
              onClick={() => handleAddNewStudent()}
              className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white cursor-pointer"
            >
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
              <span>Add New</span>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={test.data[test.page] || []}
          editLinkPrefix={() => handleAddNewStudent(1)}
          // deleteHandler={handleDelete}
        />
        <Pagination data={test} changePage={changePage} />
      </div>
    </>
  );
}
