module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.import('./Groups')
  const Users = sequelize.define("Users", {
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
  Users.belongsTo(Groups, {foreignKey: 'group_id', onDelete: 'CASCADE'})
  return Users
}
