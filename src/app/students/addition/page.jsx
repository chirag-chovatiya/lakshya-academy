"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import DeleteButton from "@/components/Switchers/DeleteButton";
import FormStudentAddition from "./components/form-element";

export default function StudentLists() {
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
        <Breadcrumb pageName="Student Addition" />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white">
                <span>
                  <i className="fa-solid fa-arrows-rotate"></i>
                </span>
                <span>Refresh</span>
              </button>
              <select
                id="pagesizeForBlog"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
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
        <div className="rounded-xl border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 bg text-left dark:bg-meta-4">
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    ID
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Student Level
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Addition Row
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Addition Column
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Total Addition
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-sm text-black dark:text-white">1</p>
                  </td>
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">2</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">3</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">
                      4
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">
                      10
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <div
                        onClick={() => handleAddNewStudent(1)} 
                        className="cursor-pointer hover:text-primary"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </div>
                      <DeleteButton />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );
}
