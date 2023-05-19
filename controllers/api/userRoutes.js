const router = require('express').Router();
const { Department } = require('../../models/departments');
const { User } = require('../..models');
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
router.post('/', async (req, res) => {
    try {
        const newDapartmetn = await Department.create({
            ...req.bidy,
            user_id: req.session.user_id,
        });

        res.status(200).json(newDapartmetn);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
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

             req.json({ user: userData, meessage: 'YoU are now logged in!' });
        }); 
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.sesssion.logged_in) {
        req. sessions.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;