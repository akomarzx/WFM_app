
const express = require('express');
const positionController = require('../controller/positionController');
// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-position',
    positionController.getCreatePositionForm);

router.get('/update-position',
    positionController.getUpdatePositionForm);

router.get('/delete-position',
    positionController.getDeletePositionForm);

router.get('/show-positions',
    positionController.getShowPositionsPage);

router.route('/')
    .get(positionController.getPositions)
    .post(positionController.createPosition);

router.route('/:id')
    .patch(positionController.updatePosition)
    .get(positionController.getPosition)
    .delete(positionController.deletePosition);

module.exports = router;
