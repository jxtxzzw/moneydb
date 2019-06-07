module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Permissions', {
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    api: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })
}
