const router = require('express').Router();
const { User, Employee, } = require('../models');
const withAuth = require('../utils/auth');


//GET route for homepage
router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('homepage', {
        loggedIn: req.session.logged_in,
    });
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
     const employeeData = await Employee.findAll({
        include: [
            {
                model: User,
                attributes: ['name', 'email']
            },
        ],
     });

     const employees = employeeData.map((employee) => employee.get({ plain: true }));
     
     res.render('dashboard', {
        employees,
        logged_in: req.session.logged_in
     });
    } catch (err) { 
        res.status(500).json(err);
    }
});
router.get('/employee/:id', withAuth, async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name', 'role_id', 'id'],

                },
            ],
        });

        const Employee = employeeData.get({plain: true});
        
        res.render('dashboard', {
            employee,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;