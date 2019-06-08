module.exports = (sequelize, DataTypes) => {
  const Receptionists = sequelize.import('./Receptionists')
  const Packages = sequelize.import('./Packages')
  const PackageReceptionists = sequelize.define('PackageReceptionists', {
  })
  PackageReceptionists.belongsTo(Receptionists, {
    foreignKey: 'receptionist_id',
    targetKey: 'receptionist_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  PackageReceptionists.belongsTo(Packages, {
    foreignKey: 'package_id',
    targetKey: 'package_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  return PackageReceptionists
}
