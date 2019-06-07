module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.import('./Employees')
  const Receptionists = sequelize.define('Receptionists', {
  })
  Receptionists.belongsTo(Employees, {
    foreignKey: 'receptionist_id',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  return Receptionists
}
