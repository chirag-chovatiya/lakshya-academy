import { useState, useEffect } from "react";
import FullScreenModal from "@/components/app-modal/modal.home.component";
import Results from "./test-result";
import { get } from "@/service/api";
import { API } from "@/service/constant/api-constant";

export default function TestModel({
  isModalOpen,
  setIsModalOpen,
  selectedCard,
}) {
  const [filteredData, setFilteredData] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getSign = (cardType) => {
    switch (cardType) {
      case "addition":
        return "+";
      case "subtraction":
        return "-";
      case "multiplication":
        return "×";
      case "division":
        return "÷";
      default:
        return "";
    }
  };

  const fetchData = async () => {
    try {
      const response = await get(API.getAllTest);
      if (response.code === 200 && response.data) {
        const testData = response.data[0];  
        console.log(testData[selectedCard]); 
        const selectedTestData = testData[selectedCard] || [];
        setFilteredData(selectedTestData);
      }
    } catch (error) {
      console.error("Failed to fetch test data:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const savedAnswers = JSON.parse(localStorage.getItem(selectedCard)) || [];
      if (savedAnswers.length > 0) {
        setUserAnswers(savedAnswers);
        setShowResults(true);
      } else {
        setUserAnswers(savedAnswers);
        setCurrentIndex(0);
        setShowResults(false);
      }
      fetchData();
    }
  }, [isModalOpen, selectedCard]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = {
      question: filteredData[currentIndex]?.question,
      userAnswer: Number(e.target.value),
    };
    setUserAnswers(newAnswers);
    localStorage.setItem(selectedCard, JSON.stringify(newAnswers)); 
  };

  const resetTest = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    localStorage.removeItem(selectedCard); 
  };

  const currentQuestion = filteredData[currentIndex] || {}; 

  const calculateScore = () => {
    const correctAnswersCount = userAnswers.filter(
      (ans, index) => ans.userAnswer === filteredData[index]?.answer
    ).length;

    const totalScore = `${correctAnswersCount}/${filteredData.length} (${(
      (correctAnswersCount / filteredData.length) *
      100
    ).toFixed(2)}%)`;

    return totalScore;
  };

  return (
    <FullScreenModal
      isOpen={isModalOpen}
      onClose={closeModal}
      headerTitle={showResults ? "Test Results" : `${selectedCard}`}
      showCloseButton={true}
    >
      <div className="w-full">
        {showResults ? (
          <Results
            questions={filteredData}
            userAnswers={userAnswers}
            questionType={selectedCard}
            getSign={getSign}
            totalScore={calculateScore()}
          />
        ) : (
          currentQuestion && (
            <div className="p-4 w-full">
              <div className="text-center text-4xl">
                {currentQuestion?.question?.map((num, index) => (
                  <p key={index} className="text-center text-4xl">
                    {index > 0 && getSign(selectedCard)} {num}
                  </p>
                ))}
              </div>
              <input
                type="number"
                className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded"
                placeholder="Your answer"
                value={userAnswers[currentIndex]?.userAnswer || ""}
                onChange={handleAnswerChange}
              />
            </div>
          )
        )}

        {!showResults && (
          <div className="flex justify-between mt-4">
            <button
              className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={userAnswers[currentIndex]?.userAnswer === undefined && currentIndex < filteredData.length}
            >
              {currentIndex === filteredData.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        )}
      </div>
    </FullScreenModal>
  );
}
