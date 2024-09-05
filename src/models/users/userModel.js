import { User} from "./userSchema";

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
export const getAllUser = async () => {
  try {
    const getUsers = await User.findAll();
    return getUsers;
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
    const findUser = await User.findOne({ where: { id:userId } });
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
      const UserDelete = await deleteUser.update({ status: 'Delete' });
      return UserDelete;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

