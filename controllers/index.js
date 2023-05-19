const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
<script src="project-2\server"></script>
router.use('./', homeRoutes);
router.use('/', apiRoutes);

module.exports = router;