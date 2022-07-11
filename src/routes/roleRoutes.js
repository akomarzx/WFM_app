// TODO: validation
// TODO: change the redirection in the back button
// use another form with different action
const express = require('express');
const roleController = require('../controller/roleController');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-role', roleController.getCreateRoleForm);
router.get('/update-role', roleController.getUpdateRoleForm);
router.get('/delete-role', roleController.getDeleteRoleForm);

router.post('/', roleController.createRole);
router.put('/', roleController.updateRole);
router.delete('/', roleController.deleteRole);

module.exports = router;
