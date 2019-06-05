module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Members', {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isUUID: 4
      },
      defaultValue: DataTypes.UUIDV4
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
      type: DataTypes.STRING
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
