"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import Table from "@/components/app-table/app-table";
import { useSearchParams } from "next/navigation";
import { del, get } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import * as XLSX from "xlsx";

export default function StudentLists() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId");
  const [studentData, setStudentData] = useState([]);

  const fetchStudentData = async (id) => {
    try {
      const response = await get(`${API.getAllUser}/${id}`);
      if (response.code == 200 && response.data && response.data.reports) {
        const formattedData = response.data.reports.map((report) => ({
          ...report,
          createdAt: new Date(report.createdAt).toLocaleDateString("en-GB"), 
          hwstatus: report.hwstatus === 1 ? "Complete" : "Incomplete",
        }));
        setStudentData(formattedData);
      } else {
        console.error("Failed to fetch student data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentData(studentId);
    } else {
      console.error("No student ID provided in the URL.");
    }
  }, [studentId]);

  const columns = [
    { key: "id", title: "ID" },
    { key: "createdAt", title: "Date" },
    { key: "additionMark", title: "Addition" },
    { key: "subtractionMark", title: "Subtraction" },
    { key: "multiplicationMark", title: "Multiplication" },
    { key: "divisionMark", title: "Division" },
    { key: "hwstatus", title: "H W Status" },
    { key: "result", title: "Result" },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await del(API.getReport + `/${id}`);
      if (response.success) {
        console.log("Report deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const exportToExcel = () => {
    const transformedData = studentData.map((report) => {
      return columns.reduce((acc, column) => {
        acc[column.title] = report[column.key]; 
        return acc;
      }, {});
    });

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
    XLSX.writeFile(workbook, "student_data.xlsx");
  };



  return (
    <>
      <div>
        <Breadcrumb pageName="Student Monthly Report" />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white">
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
          data={studentData}
          deleteHandler={handleDelete}
        />
      </div>
    </>
  );
}
