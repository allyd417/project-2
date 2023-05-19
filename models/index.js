const User = require('./user');
const Employee = require('./employee');
const Department = require('./departments');

User.hasMany(Department, {
    primaryKey: 'user_id',
    onDelete: 'CASCADE'
});

Department.belongsTo(User, {
    primaryKey: 'user_id'
});

User.hasMany(Employee, {
    primaryKey: 'user_id',
    onDelete: 'CASCADE'
});

Employee.belongsTo(User, {
    primaryKey: 'user_id'
});

module.exports = { User };