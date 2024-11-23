import { useState, useEffect } from "react";
import FullScreenModal from "@/components/app-modal/modal.home.component";
import Results from "./test-result";
import { get, post } from "@/service/api";
import { API } from "@/service/constant/api-constant";
import jwt from "jsonwebtoken";

export default function TestModel({
  isModalOpen,
  setIsModalOpen,
  selectedCard,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [testId, setTestId] = useState(null);

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
        const token = localStorage.getItem("t");
        const decoded = jwt.decode(token);
        const studentLevel = decoded?.level;
        console.log("Student Level:", studentLevel);

        const activeTestData = response.data.filter(
          (test) => test.status === true && test.level === studentLevel
        );

        if (activeTestData.length > 0) {
          const selectedTestData =
            (activeTestData[0] && activeTestData[0][selectedCard]) || [];
          setFilteredData(selectedTestData);
          const testDataId = activeTestData[0].id;
          setTestId(testDataId);
        } else {
          console.log("No matching tests for the student's level.");
        }
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

  const handleNext = async () => {
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      localStorage.setItem(selectedCard, JSON.stringify(userAnswers));

      const correctAnswersCount = userAnswers.filter(
        (ans, index) => ans.userAnswer === filteredData[index]?.answer
      ).length;
      const totalScore = `${correctAnswersCount}/${filteredData.length}`;

      const token = localStorage.getItem("t");
      const decoded = typeof token === "string" ? jwt.decode(token) : token;
      const fieldToUpdate = `${selectedCard}Mark`;

      const payload = {
        studentId: decoded.id,
        testId: testId,
        [fieldToUpdate]: totalScore,
      };
      console.log("jjj", payload);

      try {
        const response = await post(API.getReport, payload, false, token);
        console.log("Response:", response);
        if (response.code === 200) {
          console.log("Test results submitted successfully:", response.data);
        } else {
          console.log("Error submitting test results:", error);
        }
      } catch (error) {
        console.log(error);
        console.error("Error submitting score:", error);
      }
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
        {filteredData.length === 0 ? (
          <p className="text-center text-xl text-red-500">No test found</p>
        ) : showResults ? (
          <Results
            questions={filteredData}
            userAnswers={userAnswers}
            questionType={selectedCard}
            getSign={getSign}
            totalScore={calculateScore()}
          />
        ) : (
          currentQuestion && (
            <div className="w-full flex flex-col justify-center items-center mb-20">
              <div className="text-center text-4xl">
                {currentQuestion?.question?.map((num, index) => (
                  <p key={index} className="text-center text-5xl">
                    {index > 0 && getSign(selectedCard)} {num}
                  </p>
                ))}
              </div>

              <input
                type="number"
                className="w-1/2 mt-10 p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded"
                placeholder="Your answer"
                value={userAnswers[currentIndex]?.userAnswer || ""}
                onChange={handleAnswerChange}
              />
            </div>
          )
        )}

        {!showResults && filteredData.length > 0 && (
          <div className="flex justify-between">
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
              disabled={false}
            >
              {currentIndex === filteredData.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        )}
      </div>
    </FullScreenModal>
  );
}
