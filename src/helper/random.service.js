export const generateRandomNumber = (numDigits, pointFlag = false) => {
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;

  const number = Math.random() * (max - min) + min;
  return pointFlag ? parseFloat(number.toFixed(2)) : Math.floor(number);
};


export const generateAdditionQuestion = (horizontalDigits, verticalDigits, pointFlag = false) => {
  const verticalNumbers = Array.from({ length: verticalDigits }, () =>
    generateRandomNumber(horizontalDigits, pointFlag)
  );
  const totalSum = verticalNumbers.reduce((acc, num) => acc + num, 0);
  return {
    question: verticalNumbers,
    answer: pointFlag ? parseFloat(totalSum.toFixed(2)) : totalSum
  };
};

export const generateSubtractionQuestion = (horizontalDigits, subDigits, pointFlag = false) => {
  const subNumber = generateRandomNumber(subDigits, pointFlag);
  const horizontalNumber = generateRandomNumber(horizontalDigits, pointFlag);
  const startingNumber = horizontalNumber + subNumber;
  const result = startingNumber - subNumber;
  return {
    question: [parseFloat(startingNumber.toFixed(2)), subNumber],
    answer: pointFlag ? parseFloat(result.toFixed(2)) : result
  };
};


export const generateMultiplicationQuestion = (horizontalDigits, subDigits, pointFlag = false) => {
  const horizontalNumber = generateRandomNumber(horizontalDigits, pointFlag);
  const subNumber = generateRandomNumber(subDigits, pointFlag);
  const totalMultiplication = horizontalNumber * subNumber;

  return {
    question: [horizontalNumber, subNumber],
    answer: pointFlag ? parseFloat(totalMultiplication.toFixed(2)) : totalMultiplication
  };
};


export const generateDivisionQuestion = (horizontalDigits, subDigits, pointFlag = false) => {
  let horizontalNumber;
  let subNumber;
  let totalDivision;

  do {
    subNumber = generateRandomNumber(subDigits);
    horizontalNumber = generateRandomNumber(horizontalDigits);
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

