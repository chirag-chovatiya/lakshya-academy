import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import React from "react";
import DeleteButton from "@/components/Switchers/DeleteButton";
import StatusButton from "@/components/Switchers/StatusButton";

export default function StudentLists() {
  return (
    <>
      <div>
        <Breadcrumb pageName="Student" />
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
              <Link
                href="./student/create"
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white"
              >
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
                <span>Add New</span>
              </Link>
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
                  Image
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    FullName
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Phone
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Address
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Standerd
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Status
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
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <img
                      src="/assets/image.jpg"
                      alt="student"
                      className="object-cover w-16 h-16 rounded-full dark:bg-gray-200"
                    />
                  </td>

                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">Student1</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">
                      email@gmail.com
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">
                      phone
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">
                      address
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white line-clamp-3">
                      standerd
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <StatusButton></StatusButton>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        href={`./student/edit/1`}
                        className="hover:text-primary"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
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
