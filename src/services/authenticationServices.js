const {PunchInfo, User} = require('../models');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');
const ApiError = require('../utils/apiError');

const registerUserService = async (email, password, regCode) => {
  try {
    const punchInfo = await PunchInfo.findByPk(regCode);
    if (punchInfo == null) {
      throw new ApiError(
          'One of the information is invalid or already exist in the system',
          200, true);
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {email: email},
          {emp_id: punchInfo.emp_id},
        ],
      },
    });
    if (punchInfo == null || user != null) {
      throw new ApiError(
          'One of the information is invalid or already exist in the system',
          200, true);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      hash: hashedPassword,
      emp_id: punchInfo.emp_id,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUserService,
};
