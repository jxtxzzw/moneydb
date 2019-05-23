module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define('Departments', {
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        unique: true
      }
    },
    addUser: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    deleteUser: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    modifyUser: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    showUser: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    addWarehouse: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    deleteWarehouse: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    modifyWarehouse: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    showWarehouse: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    addPackage: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    deletePackage: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    modifyPackage: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    showPackageWithTrackingInfoOnly: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    showPackageWithTrackingAndUserInfo: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    showPackageWithFullInfo: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  })
  return Departments
}
