const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const employeeRoutes = require('./employeeRoutes.js');
const departmentRoutes = require('./departmentRoutes.js');


router.use('/user', userRoutes);
router.use('/employee', employeeRoutes); 
router.use('/department', departmentRoutes);

module.exports = router;