module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.import('./Employees')
  const Dispatchers = sequelize.define('Dispatchers', {
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
      validate: {
        min: 0,
        max: 5
      }
    }
  })
  Dispatchers.belongsTo(Employees, {
    foreignKey: 'uuid',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  return Dispatchers
}
