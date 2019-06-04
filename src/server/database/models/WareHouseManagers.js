module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.import('./Members')
  const WareHouseManagers = sequelize.define('WareHouseManagers', {
  })
  WareHouseManagers.belongsTo(Members, {
    foreignKey: 'manager_id',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  return WareHouseManagers
}
