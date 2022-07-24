const {sequelize, Position} = require('../models');

const getPositions = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const positions = Position.findAll();
      return positions;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPositions,
};
