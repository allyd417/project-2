const router = require('express').Router();
const { User } = require('../../models');

// router.post('/', async (req, res) => {
// 	try {
// 		const newEmployee = await Employee.create({
// 			...req.body,
// 			user_id: req.session.user_id,
// 		});

// 		res.status(200).json(newEmployee);
// 	} catch (err) {
// 		res.status(400).json(err);
// 	}
// });
// router.post('/', async (req, res) => {
// 	try {
// 		const newDapartment = await Department.create({
// 			...req.body,
// 			user_id: req.session.user_id,
// 		});

// 		res.status(200).json(newDapartment);
// 	} catch (err) {
// 		res.status(400).json(err);
// 	}
// });

// router.post('/', async (req, res) => {
// 	try {
// 		const newRoles = await Roles.create({
// 			...req.body,
// 			user_id: req.session.user_id,
// 		});

// 		res.status(200).json(newRoles);
// 	} catch (err) {
// 		res.status(400).json(err);
// 	}
// });

router.post('/login', async (req, res) => {
	console.log('loginroute')
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });
		if (!userData) {
			res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res
				.status(400)
				.json({ message: 'incorrect email or password, please try again' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, meessage: 'YoU are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	console.log(req.session)
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
