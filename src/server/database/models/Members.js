module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.import('./Departments')
  const Members = sequelize.define("Members", {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isStrongPassword (value) {
          if (value === '') {
            throw new Error('Only even values are allowed!')
          }
        }
      }
    }
  })
  Members.belongsTo(Departments, {foreignKey: 'dept_id', onDelete: 'CASCADE'})
  return Members
}
