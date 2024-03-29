const express = require('express');
const roleController = require('../controller/roleController');
const {roleSchema} = require('../utils/schemas');
const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/')
    .get(roleController.getRoles)
    .post(validateInput(roleSchema),
        roleController.createRole);

router.route('/:id')
    .get(roleController.getRole)
    .patch(roleController.updateRole)
    .delete(roleController.deleteRole);

module.exports = router;
