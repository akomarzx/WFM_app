// TODO: validation
const {PositionServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getPosition = asyncWrapper(async (req, res, next) => {
  const position = await PositionServices.getPosition(req.params.id);
  res.status(200).json(position);
});

const getPositions = asyncWrapper(async (req, res, next) => {
  const positions = await PositionServices.getPositions();
  res.status(200).json(positions);
});

const createPosition = asyncWrapper(async (req, res, next) => {
  const {positionName} = req.body;
  const position =
  await PositionServices.createPosition(positionName);
  res.status(200).json(position);
});

const updatePosition = asyncWrapper(async (req, res, next) => {
  const updated =
  await PositionServices.updatePosition(req.params.id, req.body.positionName);
  res.status(200).json(updated);
});

const deletePosition = asyncWrapper(async (req, res, next) => {
  await PositionServices.deletePosition(req.body.uuid);
  res.status(200).json({message: 'Succesfully deleted'});
});

module.exports = {
  getPosition,
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
};
