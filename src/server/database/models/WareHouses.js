module.exports = (sequelize, DataTypes) => {
  const Locatoins = sequelize.import('./Locations')
  const WareHouseManagers = sequelize.import('./WareHouseManagers')
  const WareHouses = sequelize.define('WareHouses', {
    warehouse_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    warehouse_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
  WareHouses.belongsTo(Locatoins, {
    foreignKey: 'location',
    targetKey: 'location',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  WareHouses.belongsTo(WareHouseManagers, {
    foreignKey: 'warehouse_manager',
    targetKey: 'manager_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  return WareHouses
}
