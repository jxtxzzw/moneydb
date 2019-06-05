module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.import('./Members')
  const Employees = sequelize.define('Employees', {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isUUID: 4
      },
      defaultValue: DataTypes.UUIDV4
    },
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
  Employees.hasOne(Members, {
    foreignKey: 'uuid',
    sourceKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  const {md5, MD5_SUFFIX} = require('../../router/salt')
  Employees.afterCreate(async (employee, options) => {
    await Members.create({
      email: employee.email,
      uuid: employee.uuid,
      password: MD5_SUFFIX.OUTER + md5(MD5_SUFFIX.INNER + employee.phone.toString().substr(7))
    })
  })
  return Employees
}
