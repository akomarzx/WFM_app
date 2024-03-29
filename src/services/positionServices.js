const {sequelize, Position} = require('../models');
const ApiError = require('../utils/apiError');
const {EmptyResultError} = require('sequelize');
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
    const result = await sequelize.transaction(async (t) => {
      const position = await Position.create({
        positionName: newPosition,
      });
      return position;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updatePosition = async (uuid, updatedPosition) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const positionToBeUpdated = await Position.findOne({
        where: {
          uuid: uuid,
        },
        rejectOnEmpty: true,
      });
      await positionToBeUpdated.set({
        positionName: updatedPosition,
      });
      await positionToBeUpdated.save();
      return positionToBeUpdated;
    });
    return result;
  } catch (error) {
    if (error instanceof EmptyResultError) {
      throw new ApiError('Position not found', 400, false);
    }
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
        rejectOnEmpty: true,
      });
    });
  } catch (error) {
    if (error instanceof EmptyResultError) {
      throw new ApiError('Position not found', 400, false);
    }
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
