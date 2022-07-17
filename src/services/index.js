const EmployeeServices = require('./employeeServices');
const PunchInfoServices = require('./punchInfoServices');
const PermissionServices = require('./permissionServices');
const RoleServices = require('./roleServices');
const RolePermissionServices = require('./rolePermissionServices');
const AuthenticationServices = require('./authenticationServices');

module.exports ={
  AuthenticationServices,
  EmployeeServices,
  PermissionServices,
  PunchInfoServices,
  RoleServices,
  RolePermissionServices,
};

