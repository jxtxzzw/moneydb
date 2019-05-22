module.exports = (sequelize, DataTypes) => {
  const Tests = sequelize.define("Tests", {
    a: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    b: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  })
  return Tests
}
