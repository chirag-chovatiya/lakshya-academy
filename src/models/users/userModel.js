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
  teacher_id = null
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
  level = null,
  userType,
  teacherId = null,
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const includeClause = [
      {
        model: User,
        as: "studentTeacher",
        attributes: ["name"],
      },
    ];


    const whereClause = {};

    if (userType === "Teacher" && teacherId) {
      whereClause.teacherId = teacherId;
    }

    if (searchQuery) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { email: { [Op.like]: `%${searchQuery}%` } },
        { "$studentTeacher.name$": { [Op.like]: `%${searchQuery}%` } },
      ];
    }
    if (level) {
      whereClause.level = level;
    }

    if (!page && !pageSize) {
      const getUsers = await User.findAll({include: includeClause});
      return getUsers;
    }

    const getAllData = await User.findAndCountAll({
      where: whereClause,
      include: includeClause,
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
  teacherId,
  userType,
  page = 1,
  pageSize = 10,
  createdAt=null,
  hwStatus = null
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;
    const userData = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    if (userType === "Teacher" && userData.teacherId !== teacherId) {
      return;
    }

    let whereClause = {}

    if (createdAt) {
      const filterDate = new Date(createdAt);
      if (!isNaN(filterDate.getDate()) && filterDate.getDate() !== 1) {
        const startOfDay = new Date(createdAt).setHours(0, 0, 0, 0);
        const endOfDay = new Date(createdAt).setHours(23, 59, 59, 999);
        whereClause.createdAt = { [Op.between]: [startOfDay, endOfDay] };
      } else {
        const monthStart = new Date(
          filterDate.getFullYear(),
          filterDate.getMonth(),
          1
        ).setHours(0, 0, 0, 0);
        const monthEnd = new Date(
          filterDate.getFullYear(),
          filterDate.getMonth() + 1,
          0
        ).setHours(23, 59, 59, 999);
        whereClause.createdAt = { [Op.between]: [monthStart, monthEnd] };
      }
    }

    if (hwStatus === "complete") {
      whereClause.hwStatus = true;
    } else if (hwStatus === "incomplete") {
      whereClause.hwStatus = false;
    }

    const { count: totalData, rows: reports } =
      await StudentReport.findAndCountAll({
        where: {
          ...whereClause,
          studentId: userId,
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
        offset,
        limit: parsedPageSize,
      });

    const totalPages = Math.ceil(totalData / parsedPageSize);

    return {
      ...userData.toJSON(),
      reports,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData,
    };
  } catch (error) {
    console.error("Error fetching user and reports:", error);
    throw error;
  }
};

export const getTeacherNameById = async (teacherId) => {
  try {
    const teacher = await User.findOne({
      where: { id: teacherId },
    });
    if (teacher) {
      return teacher.name;
    }
    return null;
  } catch (error) {
    console.error("Error fetching teacher name:", error);
    return null;
  }
};

export const updateUserById = async (userId, teacherId, userType, newData) => {
  try {
    const findUser = await User.findOne({ where: { id: userId } });
    if (userType === "Teacher" && findUser.teacherId !== teacherId) {
      return;
    }
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
export const deleteUserById = async function (userId, teacherId, userType) {
  try {
    const deleteUser = await User.findOne({ where: { id: userId } });
    if (userType === "Teacher" && deleteUser.teacherId !== teacherId) {
      return;
    }
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
