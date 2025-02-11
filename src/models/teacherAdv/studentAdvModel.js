import { Op } from "sequelize";
import { TeacherAdvertisement } from "./studentAdvSchema";
import { User } from "../users/userSchema";

export const createTeacherAdvertise = async (data) => {
  try {
    const createData = await TeacherAdvertisement.create(data);
    return createData;
  } catch (error) {
    throw error;
  }
};
export const findTeacherAdvertiseByUserId = async (userId) => {
  try {
    const adv = await TeacherAdvertisement.findOne({
      where: {
        userId,
        status: true,
      },
    });
    return adv;
  } catch (error) {
    throw error;
  }
};

export const getAllTeacherAdvertise = async (
  userType,
  userId,
  teacherId,
  page = 1,
  pageSize = 10,
  teacherName = null
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const includeClause = [
      {
        model: User,
        as: "teacher",
        attributes: ["name"],
        where: {
          ...(teacherName && { name: { [Op.like]: `%${teacherName}%` } }),
        },
      },
    ];

    let whereClause = {};

    if (userType === "Teacher" && userId) {
      whereClause.userId = userId;
    } else if (userType === "Student") {
      whereClause.status = true;
      if (teacherId) {
        whereClause.userId = teacherId; 
      }
    }

    if (!page && !pageSize) {
      const getAdvertise = await TeacherAdvertisement.findAll({
        where: whereClause,
        include: includeClause,
      });
      return getAdvertise;
    }

    const getNote = await TeacherAdvertisement.findAndCountAll({
      where: whereClause,
      offset,
      limit: parsedPageSize,
      include: includeClause,
    });

    const totalPages = Math.ceil(getNote.count / parsedPageSize);

    return {
      data: getNote.rows,
      currentPage: parsedPage,
      totalPages,
      totalData: getNote.count,
    };
  } catch (error) {
    throw error;
  }
};

export const getTeacherAdvertiseById = async (tAdvId) => {
  try {
    const getData = await TeacherAdvertisement.findOne({
      where: { id: tAdvId },
    });
    return getData;
  } catch (error) {
    throw error;
  }
};

export const updateTeacherAdvertiseById = async (
  tAdvId,
  userId,
  userType,
  newData
) => {
  try {
    const findAdv = await TeacherAdvertisement.findOne({
      where: { id: tAdvId },
    });
    if (!findAdv) return null;

    if (userType === "Teacher" && findAdv.userId !== userId) {
      return;
    }

    if (newData.status === true) {
      const conflictingAdv = await TeacherAdvertisement.findOne({
        where: {
          userId,
          status: true,
          id: { [Op.ne]: tAdvId },
        },
      });

      if (conflictingAdv) {
        return {
          error: `Another Advertisement for already has status set to true. Please update it first.`,
        };
      }
    }

    const updatedData = {
      description: newData.description ?? findAdv.description,
      imgUrl: newData.imgUrl ?? findAdv.imgUrl,
      status: newData.status ?? findAdv.status,
    };

    const advUpdated = await findAdv.update(updatedData);
    return advUpdated;
  } catch (error) {
    throw error;
  }
};

export const deleteTeacherAdvertiseById = async function (
  tAdvId,
  userId,
  userType
) {
  try {
    const deleteAdv = await TeacherAdvertisement.findOne({
      where: { id: tAdvId },
    });
    if (!deleteAdv) {
      return {
        success: false,
        message: "No Advertisement found with the provided ID",
      };
    }

    if (userType === "Teacher" && deleteAdv.userId !== userId) {
      return {
        success: false,
        message: "Unauthorized: You cannot delete this advertisement",
      };
    }
    await deleteAdv.destroy();
    return { success: true, message: "Advertisement Deleted successfully" };
  } catch (error) {
    throw error;
  }
};
