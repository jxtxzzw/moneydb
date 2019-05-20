

module.exports = (sequelize, DataTypes) => {

  return sequelize.define("User", {

    username: DataTypes.STRING,

    password: DataTypes.STRING,

    age: DataTypes.INTEGER

  })

}
