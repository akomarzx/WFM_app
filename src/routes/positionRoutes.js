
const express = require('express');
const positionController = require('../controller/positionController');
// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/')
    .get(positionController.getPositions)
    .post(positionController.createPosition);

router.route('/:id')
    .patch(positionController.updatePosition)
    .get(positionController.getPosition)
    .delete(positionController.deletePosition);

module.exports = router;
