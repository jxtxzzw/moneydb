module.exports = (sequelize, DataTypes) => {
  const Dispatchers = sequelize.import('./Dispatchers')
  const Packages = sequelize.import('./Packages')
  const DispatchPairs = sequelize.define('DispatchPairs', {
    rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
      validate: {
        min: 0,
        max: 5
      }
    }
  })
  DispatchPairs.belongsTo(Dispatchers, {
    foreignKey: 'uuid',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  DispatchPairs.belongsTo(Packages, {
    foreignKey: 'package_id',
    targetKey: 'package_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  return DispatchPairs
}
