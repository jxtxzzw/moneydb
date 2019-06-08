module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.import('./Packages')
  const WareHouses = sequelize.import('./WareHouses')
  const Transports = sequelize.import('./Transports')
  const Trackings = sequelize.define('Trackings', {
    action: {
      type: DataTypes.ENUM('入库', '出库'),
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
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  Trackings.belongsTo(WareHouses, {
    foreignKey: 'warehouse_id',
    targetKey: 'warehouse_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  Trackings.belongsTo(Transports, {
    foreignKey: 'transport_id',
    targetKey: 'transport_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  return Trackings
}
