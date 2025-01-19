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

export const generateSubtractionQuestion = (horizontalDigits, subDigits) => {
  const horizontalNumber = generateRandomNumber(horizontalDigits);
  const subNumber = generateRandomNumber(subDigits);

  const startingNumber = horizontalNumber + subNumber;
  const result = startingNumber - subNumber;
  return { question: [startingNumber, subNumber], answer: result };
};

export const generateDivisionQuestion = (horizontalDigits, subDigits, pointFlag) => {
  let horizontalNumber;
  let subNumber;
  let totalDivision;

  do {
    horizontalNumber = generateRandomNumber(horizontalDigits);
    subNumber = generateRandomNumber(subDigits);
    totalDivision = horizontalNumber / subNumber;
    
    if (pointFlag) {
      break;
    } else {
      if (Number.isInteger(totalDivision)) {
        break;
      }
    }
  } while (true);

  const questionArray = [horizontalNumber, subNumber];
  
  return {
    question: questionArray,
    answer: pointFlag ? parseFloat(totalDivision.toFixed(2)) : totalDivision
  };
};

