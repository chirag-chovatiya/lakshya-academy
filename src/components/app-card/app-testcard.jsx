import React, { useState, useEffect } from 'react';

const additionArray = [
  { answer: 1649, question: [809, 285, 555], type: 'addition' },
  { answer: 1570, question: [745, 583, 242], type: 'addition' },
  { answer: 1152, question: [109, 418, 625], type: 'addition' },
  { answer: 1431, question: [476, 844, 111], type: 'subtraction' },
  { answer: 2038, question: [525, 914, 599], type: 'addition' }
];

const TestModel = ({ isOpen, onClose, title, questionType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  // Filter questions based on the questionType (addition, subtraction)
  const filteredQuestions = additionArray.filter(q => q.type === questionType);
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleNext = () => {
    const answer = parseInt(inputAnswer);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = { 
      question: currentQuestion.question, 
      userAnswer: answer 
    };
    setUserAnswers(updatedAnswers);
    localStorage.setItem('userAnswers', JSON.stringify(updatedAnswers));
    setInputAnswer('');

    // Move to the next question or show results
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = userAnswers[currentQuestionIndex - 1]?.userAnswer || '';
      setInputAnswer(previousAnswer.toString());
    }
  };

  const renderResults = () => {
    const correctAnswersCount = userAnswers.filter((ans, index) => ans.userAnswer === filteredQuestions[index].answer).length;
    const totalScore = `${correctAnswersCount}/${filteredQuestions.length} (${((correctAnswersCount / filteredQuestions.length) * 100).toFixed(2)}%)`;
  
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold py-5">Total Score: {totalScore}</h2>
        <ul>
          {filteredQuestions.map((q, index) => {
            const userAnswer = userAnswers[index]?.userAnswer || null;
            const isCorrect = userAnswer === q.answer;
            const questionText = q.question.join(' + ') ;
            return (
              <li key={index} className="mt-2">
                <p className="text-3xl font-semibold">
                  Q {index + 1}: {questionText}
                </p>
                <div className="flex justify-between items-center text-xl py-2">
                  <span className="flex-1 text-green-500">
                    <strong>Correct Answer:</strong> {q.answer}
                  </span>
                  <span
                    className={`flex-1 text-lg font-semibold ${isCorrect ? 'text-green-500' : 'text-red'}`}
                  >
                    <strong>Your Answer:</strong> {userAnswer} 
                    {isCorrect ? '(Correct)' : '(Incorrect)'}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="fixed z-9999 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-strokedark p-4 rounded shadow-lg max-w-screen-md max-h-[90vh] overflow-auto w-full relative">
        <button className="absolute top-2 right-2 rounded-full" onClick={onClose}>
          <i className="las la-times"></i>
        </button>
        <div className="w-full">
          <div className="block mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </div>
          {showResults ? (
            renderResults()
          ) : (
            <>
              {currentQuestion && (
                <div className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded w-full">
                  <div>
                    {currentQuestion.question.map((num, index) => (
                      <p key={index} className="text-center text-4xl">
                        {index > 0 && '+'} {num}
                      </p>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={inputAnswer}
                    onChange={(e) => setInputAnswer(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded"
                    placeholder="Your answer"
                  />
                </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="p-2 bg-gray-500 text-white rounded"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="p-2 bg-blue-500 text-white rounded"
                  onClick={handleNext}
                  disabled={!inputAnswer}
                >
                  {currentQuestionIndex === filteredQuestions.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestModel;
