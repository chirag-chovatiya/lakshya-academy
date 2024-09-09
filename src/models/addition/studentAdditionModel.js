import { generateAdditionQuestion, generateDivisionQuestion, generateMultiplicationQuestion, generateSubtractionQuestion} from "@/helper/random.service";
import { StudentAddition} from "./studentAdditionSchema";

export const createTest = async (data) => {
  try {
    const { horizontalDigits, verticalDigits,subDigits, totalQuestion, type } = data;
    const questionAnswerSet = [];

   

    for (let i = 0; i < totalQuestion; i++) {
      let question, answer;

      if (type === "addition") {
        const additionResult = generateAdditionQuestion(horizontalDigits, verticalDigits);
        question = additionResult.question;
        answer = additionResult.answer;
      } else if (type === "multiplication") {
        const multiplicationResult = generateMultiplicationQuestion(horizontalDigits, subDigits);
        question = multiplicationResult.question;
        answer = multiplicationResult.answer;
      }else if(type === "subtraction") {
        const subtractionResult = generateSubtractionQuestion(horizontalDigits, verticalDigits);
        question = subtractionResult.question;
        answer = subtractionResult.answer;
      }else if (type === "division") {
        const divisionResult = generateDivisionQuestion(horizontalDigits, subDigits);
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
export const getAllAddition = async () => {
  try {
    const getAddition = await StudentAddition.findAll();
    return getAddition;
  } catch (error) {
    throw error;
  }
};
export const getAdditionById = async (additionId) => {
  try {
    const getData = await StudentAddition.findOne({ where: { id: additionId } });
    return getData;
  } catch (error) {
    throw error;
  }
};
export const updateAdditionById = async (additionId, newData) => {
  try {
    const findAddition = await StudentAddition.findOne({ where: { id:additionId } });
    if (findAddition) {
      const additionUpdated = await findAddition.update(newData);
      return additionUpdated;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteAdditionById = async function (additionId) {
  try {
    const deleteAddition = await StudentAddition.findOne({ where: { id: additionId } });
    if (deleteAddition) {
      const additionDelete = await deleteAddition.update({ status: 'Delete' });
      return additionDelete;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

