const router = require('express').Router();
const { Department } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const newDepartment = await Department.create({
			...req.bidy,
			user_id: req.session.user_id,
		});

		res.status(200).json(newDepartment);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const departmentData = await Department.destroy({
			where: {
				id: req.params.id,
				user_id: req.sessions.user_id,
			},
		});

		if (!departmentData) {
			res.status(404).json({ message: 'No Department found.' });
			return;
		}
		res.status(200).json(departmetnData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
