"use client";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "@/components/app-modal/modal.image.component";
import { get } from "@/service/api";
import { API } from "@/service/constant/api-constant";

export default function TeacherAdvHomeModel() {
  const [isVisible, setIsVisible] = useState(false);
  const [advData, setAdvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(API.teacherAdv);
        if (response?.code === 200 && response?.data?.length > 0) {
          const activeAdv = response.data.find((item) => item.status === true);

          if (activeAdv) {
            setAdvData(activeAdv);
          }
        }
      } catch (error) {
        console.log("Failed to fetch advertisement data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isModalVisible = sessionStorage.getItem("a-m-v");

    if (!isModalVisible && advData?.status) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [advData]);

  const handleCancelClick = () => {
    setIsVisible(false);
    sessionStorage.setItem("a-m-v", "true");
  };

  return (
    <ImageUploadModal
      isOpen={isVisible}
      onClose={handleCancelClick}
      headerTitle="Admin Advertisement"
      showCloseButton={true}
    >
      <div className="h-[70vh] w-[80vw] md:h-[50vh] md:w-[60vw] bg-primary-500 relative p-4">
        <div className="bg-white bg-opacity-50 p-4 rounded-md">
          <div className="flex flex-col items-center">
            {advData?.imgUrl && (
              <img
                src={advData.imgUrl}
                alt="Advertisement"
                className="w-full h-full md:w-full md:h-full rounded-md shadow-lg"
              />
            )}
            <div className="text-center">
              <h2 className="text-xl mt-6 md:text-2xl font-bold text-custom-blue">
                {advData?.description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </ImageUploadModal>
  );
}
