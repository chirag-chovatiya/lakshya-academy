// components/Table.js
import React from "react";
import Link from "next/link";
import DeleteButton from "@/components/Switchers/DeleteButton";
import { hasPermission } from "@/utils/permissions";

const Table = ({ columns, data, editLinkPrefix, deleteHandler, editButtonVisible, onRowClick }) => {
  return (
    <div className="rounded-xl border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-4 font-medium text-black dark:text-white"
                >
                  {col.title}
                </th>
              ))}
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, key) => (
                <tr
                  key={key}
                  onClick={() => onRowClick(item.id)} // Trigger row click action
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-meta-4" // Add hover effect
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                    >
                      {col.type === "image" ? (
                        <img
                          src={item[col.key] || "/default-image.jpg"}
                          alt={item[col.key] ? "Image" : "No Image"}
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        <p className="text-black dark:text-white line-clamp-3">
                          {item[col.key] || "-----"}
                        </p>
                      )}
                    </td>
                  ))}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {editButtonVisible && hasPermission("StudentEdit") && (
                        typeof editLinkPrefix === "string" ? (
                          <Link
                            href={`${editLinkPrefix}/${item.id}`}
                            className="hover:text-primary"
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </Link>
                        ) : (
                          <button
                            onClick={() => editLinkPrefix(item.id)}
                            className="hover:text-primary"
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        )
                      )}
                      {hasPermission("StudentDelete") && (
                        <DeleteButton key={item.id} deleteAction={() => deleteHandler(item.id)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
