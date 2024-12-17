const Results = ({ questions, userAnswers, questionType, getSign, totalScore }) => {
    return (
      <div>
        <h2 className="text-xl font-semibold py-2  sm:text-left">Total Score: {totalScore}</h2>
        <ul>
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index]?.userAnswer || null;
            const isCorrect = userAnswer === q.answer;
            return (
              <li key={index} className="mt-2">
                <p className="text-3xl font-semibold">
                  Q {index + 1}. {q.question.join(" " + getSign(questionType) + " ")}
                </p>
                <div className="flex flex-col sm:flex-row justify-between md:items-center text-xl py-2">
                  <span className="text-green-500 mb-2 sm:mb-0">
                    <strong>Correct Answer:</strong> {q.answer}
                  </span>
                  <span className={`font-semibold ${isCorrect ? "text-green-500" : "text-red"}`}>
                    <strong>Your Answer:</strong> {userAnswer} {isCorrect ? "(Correct)" : "(Incorrect)"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default Results;
  