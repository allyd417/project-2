const router = require('express').Router();

//Models routes 
const department = require('project-2\models\departments.js');
const employee = require('project-2\models\employee.js');
const index = require('project-2\models\index.js');
const user = require('project-2/models/user.js');


// Controller routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const departmentRoutes = require('project-2\controllers\api\departmentRoutes.js');
const employeeRoutes = require('project-2\controllers\api\employeeRoutes.js');
const roleRoutes = require('project-2\controllers\api\rolesRoutes.js');
const userRoutes = require('project-2\controllers\api/userRoutes.js');

router.use('./', homeRoutes);
router.use('/', apiRoutes);

module.exports = router;