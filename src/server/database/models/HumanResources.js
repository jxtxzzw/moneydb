module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.import('./Employees')
  const HumanResources = sequelize.define('HumanResources', {
  })
  HumanResources.belongsTo(Employees, {
    foreignKey: 'hr_id',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  return HumanResources
}
