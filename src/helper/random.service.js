export const generateRandomNumber = (numDigits) => {
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateAdditionQuestion = (horizontalDigits, verticalDigits) => {
  const verticalNumbers = Array.from({ length: verticalDigits }, () =>
    generateRandomNumber(horizontalDigits)
  );
  const totalSum = verticalNumbers.reduce((acc, num) => acc + num, 0);

  return { question: verticalNumbers, answer: totalSum };
};

export const generateMultiplicationQuestion = (horizontalDigits, subDigits) => {
  const horizontalNumber = generateRandomNumber(horizontalDigits);
  const subNumber = generateRandomNumber(subDigits);

  const questionArray = [horizontalNumber, subNumber];
  const totalMultiplication = questionArray.reduce((acc, num) => acc * num, 1);
  
  return {
    question: questionArray,
    answer: totalMultiplication
  };
};

export const generateSubtractionQuestion = (horizontalDigits, verticalDigits) => {
  const verticalNumbers = Array.from({ length: verticalDigits }, () =>
    generateRandomNumber(horizontalDigits)
  );
  const totalSum = verticalNumbers.reduce((acc, num) => acc + num, 0);
  const startingNumber = totalSum + generateRandomNumber(horizontalDigits);
  const result = startingNumber - totalSum;

  return { question: [startingNumber, ...verticalNumbers], answer: result };
};

export const generateDivisionQuestion = (horizontalDigits, subDigits) => {
  let horizontalNumber;
  let subNumber;
  let totalDivision;

  do {
    horizontalNumber = generateRandomNumber(horizontalDigits);
    subNumber = generateRandomNumber(subDigits);
    totalDivision = horizontalNumber / subNumber;
  } while (!Number.isInteger(totalDivision));

  const questionArray = [horizontalNumber, subNumber];
  
  return {
    question: questionArray,
    answer: totalDivision
  };
};

