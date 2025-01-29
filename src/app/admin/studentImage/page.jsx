"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@/components/app-table/app-table";
import Pagination from "@/components/Pagination";
import debounce from "lodash/debounce";
import { del } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import { useImageAdminStore } from "@/providers/image-store-provider";
import ImageModal from "@/components/app-modal/modal.component.image";

export default function ImageLists() {
  const {
    userImage,
    changePage,
    onPageSizeChange,
    onSelectionChange,
    selectedData,
    search,
    initialize,
  } = useImageAdminStore((state) => state);

  const [level, setLevel] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    onSelectionChange("userImage");
    if (!userImage?.data?.[userImage.page]?.length) {
      initialize();
    }
  }, []);

  useEffect(() => {
    if (level || createdAt) {
      selectedData(level, createdAt);
    }
  }, [level, createdAt, selectedData]);

  const columns = useMemo(
    () => [
      { key: "id", title: "ID" },
      { key: "studentname", title: "Student Name" },
      { key: "standerd", title: "Student Level" },
      { key: "imgUrl", title: "HW Image", type: "image" },
      { key: "createdAt", title: "Date" },
    ],
    []
  );

  const transformedData = useMemo(
    () =>
      (userImage?.data?.[userImage.page] || []).map((item) => ({
        ...item,
        studentname: item.student?.name || "N/A",
        standerd: item.student?.level || "N/A",
        imgUrl: item.imgUrl || "",
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-GB")
          : "N/A",
      })),
    [userImage.data, userImage.page]
  );

  const deleteImage = async (id) => {
    try {
      const response = await del(API.imageUpload + `/${id}`);
      initialize("userImage");
      return response;
    } catch (error) {
      console.error("Error deleting image data:", error);
    }
  };

  const handleSearch = useCallback(
    debounce((query) => {
      search(query);
    }, 300),
    [search]
  );

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div>
        <Breadcrumb pageName="Student Image" totalData={userImage.totalData} />
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row md:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 flex space-x-2 rounded-md bg-custom-blue text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={() => {
                  setLevel("");
                  setCreatedAt("");
                  handleSearch("");
                  initialize("userImage");
                }}
              >
                <span>
                  <i className="fa-solid fa-arrows-rotate"></i>
                </span>
                <span>Refresh</span>
              </button>

              <select
                id="pagesizeForReport"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => onPageSizeChange(e.target.value)}
                value={userImage.pageSize}
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
                id="levelFilter"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
              >
                <option value="">Choose a level</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Level {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <input
                type="date"
                id="dateSearch"
                value={createdAt}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>
            <div className="flex-grow mt-4 sm:mt-0">
              <input
                type="text"
                id="textSearch"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Search Here"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={transformedData}
          deleteHandler={deleteImage}
          onImageClick={handleImageClick}
        />
        <Pagination data={userImage} changePage={changePage} />
      </div>
      <ImageModal imageSrc={selectedImage} onClose={handleCloseModal} />
    </>
  );
}
