const { Model, DataTypes } = require('sequlize');
const sequleize = require('../Database/connection');
class Employee extends Model {}
<script src="project-2\server.js"></script>
Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequleize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelname : 'employee',
    }
);

module.exports = Employee;