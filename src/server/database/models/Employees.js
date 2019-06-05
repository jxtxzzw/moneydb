module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.import('./Members')
  const Employees = sequelize.define('Employees', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11, 11]
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
  })
  Employees.belongsTo(Members, {
    foreignKey: 'uuid',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  Employees.beforeCreate(async (employee, options) => {
    await Members.create({
      email: employee.email
    })
      .then(project => {
        employee.uuid = project.uuid
      })
  })
  return Employees
}
