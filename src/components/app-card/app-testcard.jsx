import React, { useState } from 'react';

const additionArray = [
  { answer: 1649, question: [809, 285, 555], type: 'addition' },
  { answer: 1570, question: [745, 583, 242], type: 'addition' },
  { answer: 1152, question: [109, 418, 625], type: 'addition' },
  { answer: 1431, question: [476, 844, 111], type: 'subtraction' }, // Example of a non-addition type
  { answer: 2038, question: [525, 914, 599], type: 'addition' }
];

const TestModel = ({ isOpen, onClose, title, questionType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [inputAnswer, setInputAnswer] = useState('');

  if (!isOpen) return null;

  const filteredQuestions = additionArray.filter(q => q.type === questionType);
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleNext = () => {
    setUserAnswers([...userAnswers, parseInt(inputAnswer)]); 
    setInputAnswer(''); 

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Check answers
    const isCorrect = userAnswers.every((answer, index) => answer === filteredQuestions[index].answer);
    if (isCorrect) {
      alert('All answers are correct!');
    } else {
      alert('Some answers are incorrect. Please try again.');
    }
    onClose();
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
        {currentQuestion && (
          <div className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded w-full">
            <div>
              {currentQuestion.question.map((num, index) => (
                <p key={index} className="text-center text-4xl">
                  {index < currentQuestion.question.length - 1 && '+'} {num}
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
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleNext}
          disabled={!inputAnswer}
        >
          {currentQuestionIndex === filteredQuestions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default TestModel;
