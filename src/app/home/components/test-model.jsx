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
  const [loading, setLoading] = useState(false);

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
      console.log("Test Model API Response:", response);

      if (response.code === 200 && response.data) {
        const token = localStorage.getItem("t");
        const decoded = jwt.decode(token);
        const studentLevel = decoded?.level;

        const activeTestData = response.data.filter(
          (test) => test.status === true && test.level === studentLevel
        );

        if (activeTestData.length > 0) {
          const newTestId = activeTestData[0].id;

          const savedTestData =
            JSON.parse(localStorage.getItem(selectedCard)) || {};
          const {
            submitted,
            testId: savedTestId,
            userAnswers: savedAnswers,
            studentId: savedStudentId,
          } = savedTestData;

          if (
            newTestId === savedTestId &&
            submitted &&
            savedStudentId === decoded.id
          ) {
            setTestId(newTestId);
            setUserAnswers(savedAnswers || []);
            setFilteredData(activeTestData[0][selectedCard] || []);
            setShowResults(true);
          } else if (savedStudentId !== decoded.id || newTestId !== testId) {
            setTestId(newTestId);
            setFilteredData(activeTestData[0][selectedCard] || []);
            setShowResults(false);
            setCurrentIndex(0);
            setUserAnswers([]);
            localStorage.removeItem(selectedCard);
          }
        } else {
          console.log("No matching tests for the student's level.");
          setFilteredData([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch test data:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
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
      setLoading(true);
      const token = localStorage.getItem("t");
      const decoded = typeof token === "string" ? jwt.decode(token) : token;

      localStorage.setItem(
        selectedCard,
        JSON.stringify({
          userAnswers,
          submitted: true,
          testId,
          studentId: decoded.id,
        })
      );

      const correctAnswersCount = userAnswers.filter(
        (ans, index) => ans.userAnswer === filteredData[index]?.answer
      ).length;
      const totalScore = `${correctAnswersCount}/${filteredData.length}`;
      const percentageScore = (correctAnswersCount / filteredData.length) * 100;

      const hwStatus = percentageScore > 0 ? 1 : 0;

      const fieldToUpdate = `${selectedCard}Mark`;

      const payload = {
        testId: testId,
        [fieldToUpdate]: totalScore,
        hwStatus,
      };

      try {
        const response = await post(API.getReport, payload, false, token);
        console.log(response);
        console.log("Response:", response);
        if (response.code === 200 || response.code === 201) {
          console.log("Test results submitted successfully:", response.data);
        } else {
          console.log("Error submitting test results:", error);
        }
      } catch (error) {
        console.log(error);
        console.error("Error submitting score:", error);
      }
      setShowResults(true);
      setLoading(false);
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
            <>
              <h2 className="text-xl font-semibold py-2  sm:text-left">
                Question : {currentIndex + 1}/{filteredData.length}
              </h2>
              <div className="w-full flex flex-col justify-center items-center mb-20">
                <div className="text-center text-4xl">
                  {currentQuestion?.question?.map((num, index) => (
                    <p key={index} className="text-center text-5xl relative">
                      {index > 0 && (
                        <span className="absolute bottom-0 left-[-40px]">
                          {getSign(selectedCard)}
                        </span>
                      )}{" "}
                      {num}
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
            </>
          )
        )}

        {!showResults && filteredData.length > 0 && (
          <div className="flex justify-between">
            <button
              className="p-2 bg-gray-500 text-white rounded disabled:opacity-70"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className="p-2 bg-custom-blue text-white rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : currentIndex === filteredData.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        )}
      </div>
    </FullScreenModal>
  );
}
