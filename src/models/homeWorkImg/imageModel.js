import { Op } from "sequelize";
import { User } from "../users/userSchema";
import { UserWorkImage } from "./imageSchema";

export const createImage = async (data) => {
  try {
    const createData = await UserWorkImage.create(data);
    return createData;
  } catch (error) {
    throw error;
  }
};
export const getAllImage = async (
  userType,
  teacherId = null,
  page = 1,
  pageSize = 10,
  level = null,
  createdAt=null,
  studentName = null,
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const includeClause = [
      {
        model: User,
        as: "student",
        attributes: ["name", "level"],
        where: {
          ...(level && { level }),
          ...(studentName && { name: { [Op.like]: `%${studentName}%` } }),
        },
      },
    ];
    const whereClause = {};

    if (userType === "Teacher" && teacherId) {
      whereClause.teacherId = teacherId; 
    }
    

    if (!page && !pageSize) {
      const getStudentImage = await UserWorkImage.findAll({
        include: includeClause,
      });
      return getStudentImage;
    }


    if (createdAt) {
      const startOfDay = new Date(createdAt).setHours(0, 0, 0, 0);
      const endOfDay = new Date(createdAt).setHours(23, 59, 59, 999);
      whereClause.createdAt = { [Op.between]: [startOfDay, endOfDay] };
    }

    
    const { rows: images, count: totalCount} = await UserWorkImage.findAndCountAll({
      where: whereClause,
      offset,
      limit: parsedPageSize,
      include: includeClause,
    });

    const totalPages = Math.ceil(totalCount / parsedPageSize);

    return {
      data: images,
      currentPage: parsedPage,
      totalPages,
      totalData: totalCount,
    };
  } catch (error) {
    throw error;
  }
};
export const getImageById = async (imageId) => {
  try {
    const getData = await UserWorkImage.findOne({ where: { id: imageId } });
    return getData;
  } catch (error) {
    throw error;
  }
};

export const deleteImageById = async function (imageId) {
  try {
    const deleteImage = await UserWorkImage.findOne({ where: { id: imageId } });
    if (deleteImage) {
      await deleteImage.destroy();
      return true;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
