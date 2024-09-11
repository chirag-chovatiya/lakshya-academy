import { User } from "./userSchema";

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
export const getAllUser = async (page = 1, pageSize = 10) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    if (!page && !pageSize) {
      const getUsers = await User.findAll();
      return getUsers;
    }

    const getAllData = await User.findAndCountAll({
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
      const UserDelete = await deleteUser.update({ status: "Delete" });
      return UserDelete;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
