"use client";
import { useState } from "react";
import TestModel from "./test-model";

export default function HeroSection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cardType) => {
    setSelectedCard(cardType);
    setIsModalOpen(true);  // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedCard(null);
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 p-5">
        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("addition")}
        >
          <h2 className="text-3xl font-semibold mb-3">+</h2>
          <h2 className="text-xl font-semibold mb-3">Addition</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("subtraction")}
        >
          <h2 className="text-3xl font-semibold mb-3">-</h2>
          <h2 className="text-xl font-semibold mb-3">Subtraction</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("multiplication")}
        >
          <h2 className="text-3xl font-semibold mb-3">x</h2>
          <h2 className="text-xl font-semibold mb-3">Multiplication</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
          onClick={() => openModal("division")}
        >
          <h2 className="text-3xl font-semibold mb-3">/</h2>
          <h2 className="text-xl font-semibold mb-3">Division</h2>
          <p className="font-semibold">0/10 (0.00%)</p>
        </div>
      </div>

      {selectedCard && (
        <TestModel 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          selectedCard={selectedCard} 
        />
      )}
    </>
  );
}
