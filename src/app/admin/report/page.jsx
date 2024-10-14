"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import { useUserAdminStore } from "@/providers/user-store-provider";
import Table from "@/components/app-table/app-table";
import * as XLSX from "xlsx";

export default function StudentLists() {
  // Dummy data for students
  const dummyData = [
    {
      id: 1,
      studentname: "John Doe",
      standerd: "5th",
      addition: 85,
      subtraction: 90,
      multiplication: 75,
      division: 80,
      hwstatus: "Complete",
    },
    {
      id: 2,
      studentname: "Jane Smith",
      standerd: "6th",
      addition: 78,
      subtraction: 85,
      multiplication: 88,
      division: 82,
      hwstatus: "Incomplete",
    },
    {
      id: 3,
      studentname: "Alice Brown",
      standerd: "5th",
      addition: 92,
      subtraction: 89,
      multiplication: 95,
      division: 91,
      hwstatus: "Complete",
    },
    {
      id: 4,
      studentname: "Bob Johnson",
      standerd: "6th",
      addition: 80,
      subtraction: 84,
      multiplication: 78,
      division: 76,
      hwstatus: "Incomplete",
    },
  ];

  const columns = [
    { key: "id", title: "ID" },
    { key: "studentname", title: "Student Name" },
    { key: "standerd", title: "Standerd" },
    { key: "addition", title: "Addition" },
    { key: "subtraction", title: "Subtraction" },
    { key: "multiplication", title: "Multiplication" },
    { key: "division", title: "Division" },
    { key: "hwstatus", title: "H W Status" },
  ];

  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
  };

  const onPageSizeChange = (value) => {
    console.log(`Page size changed to: ${value}`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dummyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
    XLSX.writeFile(workbook, "student_data.xlsx");
  };

  return (
    <>
      <div>
        <Breadcrumb pageName="Student Report" />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white"
                onClick={() => window.location.reload()}
              >
                <span>
                  <i className="fa-solid fa-arrows-rotate"></i>
                </span>
                <span>Refresh</span>
              </button>
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white"
                onClick={exportToExcel}
              >
                <span>Export</span>
              </button>
              <select
                id="pagesizeForBlog"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => onPageSizeChange(e.target.value)}
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
                id="pagesizeForBlog"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
              >
                <option value="" disabled selected>
                  H W Status
                </option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                id="pagesizeForBlog"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
              >
                <option value="" disabled selected>
                  Choose a level
                </option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <input
                type="date"
                id="search"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search Here"
              />
            </div>
            <div className="flex-grow mt-4 sm:mt-0">
              <input
                type="text"
                id="search"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search Here"
              />
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={dummyData} // Use dummyData here
          deleteHandler={handleDelete}
        />
      </div>
    </>
  );
}
