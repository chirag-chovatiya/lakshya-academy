"use client";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "@/components/app-modal/modal.image.component";

export default function AdminAdvHomeModel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isModalVisible = sessionStorage.getItem("modal-visible");
    if (!isModalVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCancelClick = () => {
    setIsVisible(false);
    sessionStorage.setItem("modal-visible", "true");
  };

  return (
    <ImageUploadModal
      isOpen={isVisible} 
      onClose={handleCancelClick}
      headerTitle="Admin Advertisement"
      showCloseButton={true}
    >
      <div className="h-[70vh] w-[80vw] md:h-[50vh] md:w-[60vw] bg-primary-500 relative">
        <div className="inset-0 bg-white bg-opacity-50"></div>
        <div className="container flex flex-col justify-center items-center">
          <div className="flex items-center flex-col md:flex-row justify-center gap-4 md:gap-6">
            <div>
              <h2 className="text-xl md:text-3xl text-custom-blue font-bold">
                Claim Your One Month Free Plan
              </h2>
              <div className="pt-4 text-md md:text-lg">
                <p className="text-gray-500">
                  Sign up now and get access to all our features for free, for an entire month! No hidden fees, no obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ImageUploadModal>
  );
}
