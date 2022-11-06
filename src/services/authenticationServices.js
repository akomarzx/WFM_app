const {PunchInfo, User} = require('../models');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');
const ApiError = require('../utils/apiError');

const registerUser = async (email, password, regCode) => {
  try {
    const punchInfo = await PunchInfo.findByPk(regCode);
    if (punchInfo == null) {
      throw new ApiError(
          'One of the information is invalid or already exist in the system',
          400, true);
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {email: email},
          {empId: punchInfo.empId},
        ],
      },
    });
    if (punchInfo == null || user != null) {
      throw new ApiError(
          'One of the information is invalid or already exist in the system',
          400, true);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      hash: hashedPassword,
      empId: punchInfo.empId,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
};
