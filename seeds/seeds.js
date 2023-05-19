const sequlize = require('../Database/connection');
const { User, Employee, Departments } = require('../models');

const userData = require('./userData.json');
const employeeData = require('./employeeData.json');
const DepartmentData = require('/departmentData.json');
const Department = require('../models/departments');

const seedDatabase = async () => {
    await sequlize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const employee of employeeData) {
        await Employee.create({
            ...employee,
            user_id: users[Math.florr(Math.random() * users.length)].id,
        });
    }
    for (const department of departmentData) {
        await Department.create({
            ...Department,
            user_id: users[Math.florr(Math.random() * users.length)].id,
        });
    }
    process.exit(0);
};

seedDatabase();