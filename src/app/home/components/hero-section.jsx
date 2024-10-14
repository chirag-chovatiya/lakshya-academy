"use client";
import { useState } from "react";
import TestModel from "@/components/app-card/app-testcard";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", type: "" });

  const openModal = (title, type) => {
    setModalContent({ title, type });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 p-5">
        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("Addition", "addition")}
        >
          <h2 className="text-3xl font-semibold mb-3">+</h2>
          <h2 className="text-xl font-semibold mb-3">Addition</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("Multiplication", "multiplication")}
        >
          <h2 className="text-3xl font-semibold mb-3">x</h2>
          <h2 className="text-xl font-semibold mb-3">Multiplication</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("Subtraction", "subtraction")}
        >
          <h2 className="text-3xl font-semibold mb-3">-</h2>
          <h2 className="text-xl font-semibold mb-3">Subtraction</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("Division", "division")}
        >
          <h2 className="text-3xl font-semibold mb-3">/</h2>
          <h2 className="text-xl font-semibold mb-3">Division</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>
      </div>

      <TestModel
        isOpen={isOpen}
        onClose={closeModal}
        title={modalContent.title}
        questionType={modalContent.type} // Pass the question type
      />
    </>
  );
}
