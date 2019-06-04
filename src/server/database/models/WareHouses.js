module.exports = (sequelize, DataTypes) => {
  const Locatoins = sequelize.import('./Locations')
  // const WareHousesManagers = sequelize.import('./WareHousesManagers')
  const WareHouses = sequelize.define(WareHouses, {
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
  // WareHouses.belongsTo(WareHousesManagers, {
  //   foreignKey: 'uuid',
  //   onUpdate: 'CASCADE',
  //   onDelete: 'RESTRICT'
  // })
  return WareHouses
}
