"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Pagination from "@/components/Pagination";
import FormStudentAddition from "./components/form-element";
import { useTestAdminStore } from "@/providers/test-store-provider";
import Table from "@/components/app-table/app-table";
import { del, post } from "@/service/api";
import { API } from "@/service/constant/api-constant";

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
      createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
    }));
  };

  const formattedData = formatTestData(test.data[test.page] || []);

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
      const response = await post(API.getAllTest + `/${id}`, { status: newStatus });
      console.log(response)
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

  return (
    <>
      {studentAdditionObj.visible && (
        <FormStudentAddition
          studentAdditionObj={studentAdditionObj}
          handleCloseStudentForm={handleCloseStudentForm}
        />
      )}
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
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
                <div
                  onClick={() => handleAddNewStudent()}
                  className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 cursor-pointer"
                >
                  <span>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                  <span>Add New</span>
                </div>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={formattedData}
          editLinkPrefix={() => handleAddNewStudent(1)}
          deleteHandler={deleteTest}
          isStatusActive={true}
          updateStatusById={updateStatusById}
        />
        <Pagination data={test} changePage={changePage} />
      </div>
    </>
  );
}