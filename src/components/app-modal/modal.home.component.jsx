// FullScreenModal.js
import React from "react";

const FullScreenModal = ({ isOpen, onClose, children, headerTitle, showCloseButton = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" /> 
      <div className="bg-white w-full h-[500px] p-5 rounded-lg mx-10 z-50 overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800 ">{headerTitle}</h2>
          {showCloseButton && (
            <button
              className="text-2xl font-semibold text-gray-700"
              onClick={onClose}
            >
              &times; 
            </button>
          )}
        </div>
        
        <div className="h-full flex justify-center items-center mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
