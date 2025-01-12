import { AdminAdv } from "./adminAdvSchema";
import { User } from "../users/userSchema";
import { Op } from "sequelize";

export const createAdminAds = async (data) => {
  try {
    const createData = await AdminAdv.create(data);
    return createData;
  } catch (error) {
    throw error;
  }
};

export const getAllAdminAds = async (page = 1, pageSize = 10) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    if (!page && !pageSize) {
      const getAdminAdv = await AdminAdv.findAll();
      return getAdminAdv;
    }

    const { rows: desc, count: totalCount } = await AdminAdv.findAndCountAll({
      offset,
      limit: parsedPageSize,
    });

    const totalPages = Math.ceil(totalCount / parsedPageSize);

    return {
      data: desc,
      currentPage: parsedPage,
      totalPages,
      totalData: totalCount,
    };
  } catch (error) {
    throw error;
  }
};

export const getAdminAdsById = async (advId) => {
  try {
    const getData = await AdminAdv.findOne({ where: { id: advId } });
    return getData;
  } catch (error) {
    throw error;
  }
};

export const updateAdminAdsById = async (advId, newData) => {
  try {
    const findAdminAdv = await AdminAdv.findOne({ where: { id: advId } });
    if (findAdminAdv) {
      const Updated = await findAdminAdv.update(newData);
      return Updated;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
