module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.import('./Packages')
  const Trackings = sequelize.define("Trackings", {
    log: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  })
  Trackings.belongsTo(Packages, {
    foreignKey: 'package_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  return Trackings
}
