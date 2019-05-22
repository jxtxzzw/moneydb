module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Customers", {
    phone: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    }
  })
}
