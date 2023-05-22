const sequlize = require('../config/connection');
const { User, Employee, Department } = require('../models');

const userData = require('./userData.json');
// const employeeData = require('./employeeData.json');
// const departmentData = require('/departmentData.json');


const seedDatabase = async () => {
    await sequlize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // for (const employee of employeeData) {
    //     await Employee.create({
    //         ...employee,
    //         user_id: users[Math.florr(Math.random() * users.length)].id,
    //     });
    // }
    // for (const department of departmentData) {
    //     await Department.create({
    //         ...department,
    //         user_id: users[Math.florr(Math.random() * users.length)].id,
    //     });
    // }
    process.exit(0);
};

seedDatabase();