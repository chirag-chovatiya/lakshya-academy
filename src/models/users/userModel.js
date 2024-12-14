import { Op } from "sequelize";
import { User } from "./userSchema";
import { StudentReport } from "../studentReport/studentReportSchema";

export const createUser = async (data) => {
  try {
    const createData = await User.create(data);
    return createData;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const getData = await User.findOne({ where: { email: email } });
    return getData;
  } catch (error) {
    throw error;
  }
};
export const getAllTeacherUser = async (
  page = 1,
  pageSize = 10,
  searchQuery = null,
  teacher_id=null
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const whereClause = {};

    if (teacher_id) {
      whereClause.teacher_id = teacher_id;
    }

    if (!page && !pageSize) {
      const getUsers = await User.findAll();
      return getUsers;
    }

    if (searchQuery) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { email: { [Op.like]: `%${searchQuery}%` } },
      ];
    }
    const getAllData = await User.findAndCountAll({
      where: whereClause,
      offset,
      limit: parsedPageSize,
    });

    const totalPages = Math.ceil(getAllData.count / parsedPageSize);
    

    return {
      data: getAllData.rows,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData: getAllData.count,
    };
  } catch (error) {
    throw error;
  }
};
export const getAllUser = async (
  page = 1,
  pageSize = 10,
  searchQuery = null,
  userType,
  teacherId = null,
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const whereClause = {};

    if (userType === "Teacher" && teacherId) {
      whereClause.teacherId = teacherId;
    }

    if (!page && !pageSize) {
      const getUsers = await User.findAll();
      return getUsers;
    }

    if (searchQuery) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { email: { [Op.like]: `%${searchQuery}%` } },
      ];
    }
    const getAllData = await User.findAndCountAll({
      where: whereClause,
      offset,
      limit: parsedPageSize,
    });

    const totalPages = Math.ceil(getAllData.count / parsedPageSize);

    return {
      data: getAllData.rows,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData: getAllData.count,
    };
  } catch (error) {
    throw error;
  }
};
export const getUserById = async (userId) => {
  try {
    const getData = await User.findOne({ where: { id: userId } });
    return getData;
  } catch (error) {
    throw error;
  }
};
export const getUserByIdWithReports = async (
  userId,
  page = 1,
  pageSize = 10,
  month = null,
  year = null,
  hwStatus = null
) => {
  try {
    const userData = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    let dateCondition = {};
    if (month && year) {
      dateCondition = {
        createdAt: {
          [Op.between]: [
            new Date(`${year}-${month}-01T00:00:00.000Z`),
            new Date(`${year}-${month}-31T23:59:59.999Z`),
          ],
        },
      };
    }

    let hwStatusCondition = {};
    if (hwStatus !== null) {
      hwStatusCondition = { hwStatus: hwStatus === 'true' }; 
    }

    const { count: totalData, rows: reports } =
      await StudentReport.findAndCountAll({
        where: {
          studentId: userId,
          ...dateCondition,
          ...hwStatusCondition
        },
        attributes: [
          "id",
          "testId",
          "additionMark",
          "subtractionMark",
          "multiplicationMark",
          "divisionMark",
          "result",
          "hwStatus",
          "createdAt",
        ],
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });

    const totalPages = Math.ceil(totalData / pageSize);

    return {
      ...userData.toJSON(),
      reports,
      currentPage: page,
      totalPages,
      totalData,
    };
  } catch (error) {
    console.error("Error fetching user and reports:", error);
    throw error;
  }
};

export const updateUserById = async (userId, newData) => {
  try {
    const findUser = await User.findOne({ where: { id: userId } });
    if (findUser) {
      const userUpdated = await findUser.update(newData);
      return userUpdated;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteUserById = async function (userId) {
  try {
    const deleteUser = await User.findOne({ where: { id: userId } });
    if (deleteUser) {
      await deleteUser.destroy();
      return true;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
