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

const getPosition = async (positionUuid) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const positions = await Position.findOne({
        where: {
          uuid: positionUuid,
        },
        rejectOnEmpty: true,
        benchmark: true,
      });
      return positions;
    });
    return result;
  } catch (error) {
    throw error;
  };
};

const createPosition = async (newPosition) => {
  try {
    await sequelize.transaction(async (t) => {
      await Position.create({
        positionName: newPosition,
      });
    });
  } catch (error) {
    throw error;
  }
};

const updatePosition = async (uuid, updatedPosition) => {
  try {
    await sequelize.transaction(async (t) => {
      const positionToBeUpdated = await Position.findOne({
        where: {
          uuid: uuid,
        },
      });
      await positionToBeUpdated.set({
        positionName: updatedPosition,
      });
      await positionToBeUpdated.save();
    });
  } catch (error) {
    throw error;
  }
};

const deletePosition = async (uuid) => {
  try {
    sequelize.transaction(async (t) => {
      await Position.destroy({
        where: {
          uuid: uuid,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPositions,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
};
