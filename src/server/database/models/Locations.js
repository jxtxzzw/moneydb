module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    location: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  })
  Locations.belongsTo(Locations, {
    foreignKey: 'father',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  return Locations
}
