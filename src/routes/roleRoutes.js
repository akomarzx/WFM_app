const express = require('express');
const roleController = require('../controller/roleController');
const {roleSchema} = require('../utils/schemas');
const validateInput = require('../middlewares/validateInput');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/create-role', roleController.getCreateRoleForm);
router.get('/update-role', roleController.getUpdateRoleForm);
router.get('/delete-role', roleController.getDeleteRoleForm);

router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRole);

router.post('/',
    validateInput(roleSchema),
    roleController.createRole);
// TODO: seperate route for put
// ie roles/:id because req.body is used for different thing
// use js to modify the form action
// use path params

router.put('/',
    validateInput(roleSchema),
    roleController.updateRole);

router.delete('/', roleController.deleteRole);

module.exports = router;
