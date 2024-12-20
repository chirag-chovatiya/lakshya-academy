import React from "react";
import Link from "next/link";
import DeleteButton from "@/components/Switchers/DeleteButton";
import { hasPermission } from "@/utils/permissions";

const Table = ({
  columns,
  data,
  editLinkPrefix,
  deleteHandler,
  editButtonVisible,
  isStatusActive = false,
  updateStatusById,
  onImageClick,
}) => {
  const handleStatusChange = (id, newStatus) => {
    updateStatusById(id, newStatus);
  };

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
            {data.length > 0 ? (
              data.map((item, key) => (
                <tr key={key}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                    >
                      {col.key === "status" ? (
                        isStatusActive ? (
                          <label className="relative inline-block w-10 h-6 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item[col.key]}
                              onChange={() =>
                                handleStatusChange(item.id, !item[col.key])
                              }
                              className="absolute w-0 h-0 opacity-0"
                            />
                            <span
                              className={`block w-10 h-6 rounded-full bg-gray-400 ${
                                item[col.key] ? "bg-green-500" : "bg-red-500"
                              } transition-all`}
                            />
                            <span
                              className={`absolute left-1 top-1 w-4 h-4  bg-white rounded-full transition-all ${
                                item[col.key] ? "translate-x-4" : ""
                              }`}
                            />
                          </label>
                        ) : (
                          <p
                            className={`font-medium ${
                              item[col.key] ? "text-green-600" : "text-red"
                            }`}
                          >
                            {item[col.key] ? "Active" : "Inactive"}
                          </p>
                        )
                      ) : col.key === "name" ? (
                        <Link
                          href={`/admin/monthlyreport?studentId=${item.id}`}
                          className="text-custom-blue font-semibold hover:underline"
                        >
                          {item[col.key] || "-----"}
                        </Link>
                      ) : col.type === "image" ? (
                        <img
                          src={item[col.key] || "/default-image.jpg"}
                          alt={item[col.key] ? "Image" : "No Image"}
                          className="w-16 h-16 object-cover border border-stroke dark:border-strokedark rounded-md cursor-pointer"
                          onClick={() => onImageClick(item[col.key])}
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
                      {editButtonVisible &&
                        hasPermission("StudentEdit") &&
                        (typeof editLinkPrefix === "string" ? (
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
                        ))}
                      {hasPermission("StudentDelete") && (
                        <DeleteButton
                          key={item.id}
                          deleteAction={() => deleteHandler(item.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-4 text-gray-500"
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
