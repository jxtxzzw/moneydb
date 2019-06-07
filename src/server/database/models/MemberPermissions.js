module.exports = (sequelize, DataTypes) => {
  const MemberPermissions = sequelize.define('MemberPermissions', {
  })
  const Permissions = sequelize.import('./Permissions')
  const Employees = sequelize.import('./Employees')
  MemberPermissions.belongsTo(Employees, {
    foreignKey: 'uuid',
    targetKey: 'uuid',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  MemberPermissions.belongsTo(Permissions, {
    foreignKey: 'permission_id',
    targetKey: 'permission_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
return MemberPermissions
}
