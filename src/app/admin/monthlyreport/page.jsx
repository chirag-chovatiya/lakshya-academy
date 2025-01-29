"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import Table from "@/components/app-table/app-table";
import { useSearchParams } from "next/navigation";
import { del, get } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import * as XLSX from "xlsx";
import Pagination from "@/components/Pagination";

export default function StudentLists() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId");
  const [studentData, setStudentData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalData: 0,
    pageSize: 50,
  });
  const [hwStatus, setHwStatus] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  
  const fetchStudentData = async (id, page = 1, pageSize = 50, hwStatus = "", month="", year="") => {
    try {
      let url = `${API.getAllUser}/${id}?page=${page}&pageSize=${pageSize}`;
      if (hwStatus) {
        url += `&hwStatus=${hwStatus}`; 
      }
      if (month && year) {
        url += `&month=${month}&year=${year}`; 
      }
      const response = await get(url + '&');
      console.log("monthReport", response);

      if (response.code == 200 && response.data && response.data.reports) {
        const formattedData = response.data.reports.map((report) => {
          return {
            ...report,
            createdAt: new Date(report.createdAt).toLocaleDateString("en-GB"),
            hwstatus: report.hwStatus === true ? "Complete" : "Incomplete", 
          };
        });
        setStudentData(formattedData);
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalData: response.data.totalData,
          pageSize: pageSize,
        });
      } else {
        console.error("Failed to fetch student data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentData(studentId, pagination.currentPage, pagination.pageSize, hwStatus, month,
        year);
    } else {
      console.error("No student ID provided in the URL.");
    }
  }, [studentId, pagination.currentPage, pagination.pageSize, hwStatus,month,
    year]);

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

  const changePage = (pageNumber) => {
    if (pageNumber !== pagination.page) {
      setPagination((prev) => ({ ...prev, page: pageNumber }));
    }
  };

  const changePageSize = (size) => {
    setPagination({ ...pagination, pageSize: size, page: 1 });
  };

  const handleMonthChange = (e) => {
    const selectedValue = e.target.value; 
    const [selectedYear, selectedMonth] = selectedValue.split("-");
    setMonth(selectedMonth);
    setYear(selectedYear);
  };

  const handleRefresh = () => {
    setHwStatus(""); 
    setMonth(""); 
    setYear(""); 
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1,
    }));
    if (studentId) {
      fetchStudentData(studentId, 1, pagination.pageSize); 
    }
  };
  

  return (
    <>
      <div>
        <Breadcrumb pageName="Student Monthly Report" />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={handleRefresh}
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
                onChange={(e) => changePageSize(Number(e.target.value))}
                value={pagination.pageSize}
              >
                <option value="1">1</option>
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
                value={hwStatus}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e)=>setHwStatus(e.target.value)}
              >
                <option value="" disabled selected>
                  H W Status
                </option>
                <option value="true">Complete</option>
                <option value="false">Incomplete</option>
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <input
                type="month"
                id="search"
                value={`${year && month ? `${year}-${month}` : ""}`}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search Here"
                onChange={handleMonthChange}
              />
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={studentData}
          deleteHandler={handleDelete}
        />
        <Pagination data={pagination} changePage={changePage} />
      </div>
    </>
  );
}
