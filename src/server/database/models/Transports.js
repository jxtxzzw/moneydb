module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.import('./Employees')
  const Transports = sequelize.define('Transports', {
  })
  Transports.belongsTo(Employees, {
    foreignKey: 'transport_id',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  return Transports
}
