const router = require('express'). Router();
const { Employee } = require('../..models');

router.post('/', async (req, res) => {
    try {
        const newEmployee = await Employee.create({
            ...req.bidy,
            user_id: req.session.user_id,
        });

        res.status(200).json(newEmployee);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const employeeData = await Employee.destroy({
            where: {
                id: req.params.id,
                user_id: req.sessions.user_id,
            }
        });

        if (!employeeData) {
            res.status(404).json({ message: 'N employee found.'});
            return;
        }
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;