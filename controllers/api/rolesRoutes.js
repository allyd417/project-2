const router = require('express').Router();
const { Roles } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const newRoles = await Roles.create({
			...req.bidy,
			user_id: req.session.user_id,
		});

		res.status(200).json(newRoles);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const RolesData = await Roles.destroy({
			where: {
				id: req.params.id,
				user_id: req.sessions.user_id,
			},
		});

		if (!RolesData) {
			res.status(404).json({ message: 'No Role found.' });
			return;
		}
		res.status(200).json(RolesData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
