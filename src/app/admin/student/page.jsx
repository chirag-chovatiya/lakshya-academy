"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useUserAdminStore } from "@/providers/user-store-provider";
import Pagination from "@/components/Pagination";
import Table from "@/components/app-table/app-table";
import debounce from "lodash/debounce";
import { del, get } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import { hasPermission } from "@/utils/permissions";
import { useRouter } from "next/navigation";

export default function StudentLists() {
  const {
    users,
    changePage,
    onPageSizeChange,
    search,
    onSelectionChange,
    initialize,
  } = useUserAdminStore((state) => state);

  console.log(users)

  const hasCreatePermission = hasPermission("StudentCreate");
  const router = useRouter();
  useEffect(() => {
    onSelectionChange("users");
    if (Object.keys(users.data).length === 0) {
      initialize();
    }
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "FullName" },
    { key: "email", title: "Email" },
    { key: "phone_number", title: "Phone" },
    { key: "level", title: "Level" },
    { key: "user_type", title: "UserType" },
    { key: "status", title: "Status" },
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



  return (
    <>
      <div>
        <Breadcrumb pageName="Student" totalData={users.totalData} />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={() => {
                  initialize("users");
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
            {hasCreatePermission && (
              <Link
                href="../../admin/student/create"
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              >
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
                <span>Add New</span>
              </Link>
            )}
          </div>
        </div>
        <Table
          columns={columns}
          data={users.data[users.page] || []}
          editLinkPrefix="../../admin/student/edit"
          deleteHandler={handleDelete}
          editButtonVisible={true}
        />
        
        <Pagination data={users} changePage={changePage} />
      </div>
    </>
  );
}
