
const express = require('express');
const positionController = require('../controller/positionController');
// const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-position', positionController.getCreatePositionForm);
router.get('/update-position', positionController.getUpdatePositionForm);
router.get('/delete-position', positionController.getDeletePositionForm);

router.get('/', positionController.getPosition);
router.get('/:id', positionController.getPositions);

router.post('/',
    positionController.createPosition);

router.put('/:id',
    positionController.updatePosition);

router.delete('/', positionController.deletePosition);

module.exports = router;
