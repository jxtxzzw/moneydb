module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define('Members', {
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
      type: DataTypes.STRING
    }
  })
  return Members
}
