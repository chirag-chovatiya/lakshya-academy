import { generateRandomNumber } from "@/helper/random.service";
import { StudentAddition} from "./studentAdditionSchema";

export const createAddition = async (data) => {
  try {
    const { horizontalDigits, verticalDigits, totalQuestion } = data;

    const questionAnswerSet = [];

    for (let i = 0; i < totalQuestion; i++) {
      const verticalNumbers = Array.from({ length: verticalDigits }, () =>
        generateRandomNumber(horizontalDigits)
      );

      const totalSum = verticalNumbers.reduce((acc, num) => acc + num, 0);

      questionAnswerSet.push({
        question: verticalNumbers, 
        answare: totalSum          
      });
    }

    const updatedData = {
      ...data,
      question: questionAnswerSet,
    };
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

