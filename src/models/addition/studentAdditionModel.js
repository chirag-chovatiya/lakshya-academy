import {
  generateAdditionQuestion,
  generateDivisionQuestion,
  generateMultiplicationQuestion,
  generateSubtractionQuestion,
} from "@/helper/random.service";
import { StudentAddition } from "./studentAdditionSchema";

export const createTest = async (data) => {
  try {
    const {
      additionSettings,
      subtractionSettings,
      multiplicationSettings,
      divisionSettings,
      totalQuestion, 
    } = data;

    const questionAnswerSet = {
      addition: [],
      subtraction: [],
      multiplication: [],
      division: [],
    };

    const additionTotal = additionSettings?.totalQuestion || totalQuestion;
    for (let i = 0; i < additionTotal; i++) {
      const additionResult = generateAdditionQuestion(
        additionSettings?.horizontalDigits,
        additionSettings?.verticalDigits
      );
      questionAnswerSet.addition.push({
        question: additionResult.question,
        answer: additionResult.answer,
      });
    }

    const subtractionTotal = subtractionSettings?.totalQuestion || totalQuestion;
    for (let i = 0; i < subtractionTotal; i++) {
      const subtractionResult = generateSubtractionQuestion(
        subtractionSettings?.horizontalDigits,
        subtractionSettings?.subDigits
      );
      questionAnswerSet.subtraction.push({
        question: subtractionResult.question,
        answer: subtractionResult.answer,
      });
    }

    const multiplicationTotal = multiplicationSettings?.totalQuestion || totalQuestion;
    for (let i = 0; i < multiplicationTotal; i++) {
      const multiplicationResult = generateMultiplicationQuestion(
        multiplicationSettings?.horizontalDigits,
        multiplicationSettings?.subDigits
      );
      questionAnswerSet.multiplication.push({
        question: multiplicationResult.question,
        answer: multiplicationResult.answer,
      });
    }

    const divisionTotal = divisionSettings?.totalQuestion || totalQuestion;
    for (let i = 0; i < divisionTotal; i++) {
      const divisionResult = generateDivisionQuestion(
        divisionSettings?.horizontalDigits,
        divisionSettings?.subDigits
      );
      questionAnswerSet.division.push({
        question: divisionResult.question,
        answer: divisionResult.answer,
      });
    }

    const updatedData = {
      ...data,
      addition: questionAnswerSet.addition,
      subtraction: questionAnswerSet.subtraction,
      multiplication: questionAnswerSet.multiplication,
      division: questionAnswerSet.division,
    };

    const createData = await StudentAddition.create(updatedData);
    return createData;
  } catch (error) {
    throw error;
  }
};
export const getAllTest = async (page = 1, pageSize = 10, userType, teacherId) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const whereCondition = userType === "Teacher" 
      ? { teacher_id: teacherId } 
      : {};

    if (!page && !pageSize) {
      const getTest = await StudentAddition.findAll({ where: whereCondition });
      const formattedResult = getTest.map((entry) => ({
        id: entry.id,
        totalQuestion: entry.totalQuestion || null,
        addition: JSON.parse(entry.addition || []),
        subtraction: JSON.parse(entry.subtraction || []),
        multiplication: JSON.parse(entry.multiplication || []),
        division: JSON.parse(entry.division || []),
        level: entry.level,
        status: entry.status,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      }));
      return formattedResult;
    }

    const { rows, count } = await StudentAddition.findAndCountAll({
      where: whereCondition,
      offset,
      limit: parsedPageSize,
    });

    const totalPages = Math.ceil(count / parsedPageSize);
    const pageResult = rows.map((entry) => ({
      id: entry.id,
      totalQuestion: entry.totalQuestion || null,
      addition: JSON.parse(entry.addition || "[]"),
      subtraction: JSON.parse(entry.subtraction || "[]"),
      multiplication: JSON.parse(entry.multiplication || "[]"),
      division: JSON.parse(entry.division || "[]"),
      level: entry.level,
      status: entry.status,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }));

    return {
      data: pageResult,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData: count,
    };
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




