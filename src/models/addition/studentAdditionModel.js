import {
  generateAdditionQuestion,
  generateDivisionQuestion,
  generateMultiplicationQuestion,
  generateSubtractionQuestion,
} from "@/helper/random.service";
import { StudentAddition } from "./studentAdditionSchema";

export const createTest = async (data) => {
  try {
    const { horizontalDigits, verticalDigits, subDigits, totalQuestion, type } =
      data;
    const questionAnswerSet = [];

    for (let i = 0; i < totalQuestion; i++) {
      let question, answer;
      if (type === "addition") {
        const additionResult = generateAdditionQuestion(
          horizontalDigits,
          verticalDigits
        );
        question = additionResult.question;
        answer = additionResult.answer;
      } else if (type === "multiplication") {
        const multiplicationResult = generateMultiplicationQuestion(
          horizontalDigits,
          subDigits
        );
        question = multiplicationResult.question;
        answer = multiplicationResult.answer;
      } else if (type === "subtraction") {
        const subtractionResult = generateSubtractionQuestion(
          horizontalDigits,
          subDigits
        );
        question = subtractionResult.question;
        answer = subtractionResult.answer;
      } else if (type === "division") {
        const divisionResult = generateDivisionQuestion(
          horizontalDigits,
          subDigits
        );
        question = divisionResult.question;
        answer = divisionResult.answer;
      }
      questionAnswerSet.push({ question, answer });
    }
    const updatedData = { ...data, question: questionAnswerSet };
    const createData = await StudentAddition.create(updatedData);
    return createData;
  } catch (error) {
    throw error;
  }
};
export const getAllTest = async (page = 1, pageSize = 10) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    if (!page && !pageSize) {
      const getTest = await StudentAddition.findAll();
      return getTest;
    }
    const getAddition = await StudentAddition.findAndCountAll({
      offset,
      limit: parsedPageSize,
    });
    const totalPages = Math.ceil(getAddition.count / parsedPageSize);
    return {
      data: getAddition.rows,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData: getAddition.count,
    }
  } catch (error) {
    throw error;
  }
};
export const getTestById = async (testId) => {
  try {
    const getData = await StudentAddition.findOne({ where: { id: testId } });
    return getData;
  } catch (error) {
    throw error;
  }
};
export const updateTestById = async (testId, newData) => {
  try {
    const findTest = await StudentAddition.findOne({ where: { id: testId } });

    if (findTest) {
      const {
        horizontalDigits,
        verticalDigits,
        subDigits,
        totalQuestion,
        type,
      } = newData;
      const questionAnswerSet = [];
      for (let i = 0; i < totalQuestion; i++) {
        let question, answer;
        if (type === "addition") {
          const additionResult = generateAdditionQuestion(
            horizontalDigits,
            verticalDigits
          );
          question = additionResult.question;
          answer = additionResult.answer;
        } else if (type === "multiplication") {
          const multiplicationResult = generateMultiplicationQuestion(
            horizontalDigits,
            subDigits
          );
          question = multiplicationResult.question;
          answer = multiplicationResult.answer;
        } else if (type === "subtraction") {
          const subtractionResult = generateSubtractionQuestion(
            horizontalDigits,
            subDigits
          );
          question = subtractionResult.question;
          answer = subtractionResult.answer;
        } else if (type === "division") {
          const divisionResult = generateDivisionQuestion(
            horizontalDigits,
            subDigits
          );
          question = divisionResult.question;
          answer = divisionResult.answer;
        }
        questionAnswerSet.push({ question, answer });
      }
      const updatedData = { ...newData, question: questionAnswerSet };
      const testUpdated = await findTest.update(updatedData);
      return testUpdated;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteTestById = async function (testId) {
  try {
    const deleteTest = await StudentAddition.findOne({ where: { id: testId } });
    if (deleteTest) {
      await deleteTest.destroy();
      return { message: "Test deleted successfully" };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
