const {PositionServices} = require('../services');
const asyncWrapper = require('../utils/asyncWrapper');

const getCreatePositionForm = asyncWrapper(async (req, res, next) => {
  res.status(200).render('./positionViews/createPositionView');
});

const getUpdatePositionForm = asyncWrapper(async (req, res, next) => {
  res.locals.positions = await PositionServices.getPositions();
  res.status(200).render('./positionViews/updatePositionView');
});

const getDeletePositionForm = asyncWrapper(async (req, res, next) => {
  res.locals.positions = await PositionServices.getPositions();
  res.status(200).render('./positionViews/deletePositionView');
});

const getShowPositionsPage = asyncWrapper(async (req, res, next) => {
  res.locals.positions = await PositionServices.getPositions();
  res.status(200).render('./positionViews/showPositionsView');
});

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
  await PositionServices.createPosition(positionName);
  req.flash('success', 'Position Created Succesfully');
  res.status(200).redirect('back');
});

const updatePosition = asyncWrapper(async (req, res, next) => {
  await PositionServices.updatePosition(req.params.id, req.body.positionName);
  req.flash('success', 'Updated Succesfully');
  res.redirect('back');
});

const deletePosition = asyncWrapper(async (req, res, next) => {
  await PositionServices.deletePosition(req.body.uuid);
  req.flash('success', 'Deleted Succesfully');
  res.redirect('back');
});

module.exports = {
  getCreatePositionForm,
  getUpdatePositionForm,
  getDeletePositionForm,
  getShowPositionsPage,
  getPosition,
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
};
