module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.import('./Employees')
  const WareHouseManagers = sequelize.define('WareHouseManagers', {
  })
  WareHouseManagers.belongsTo(Employees, {
    foreignKey: 'manager_id',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  return WareHouseManagers
}
