module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.import('./Locations')
  const Packages = sequelize.define('Packages', {
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sender_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11, 11]
      }
    },
    sender_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    receiver_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiver_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11, 11]
      }
    },
    receiver_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receive_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('已揽件', '运输中', '派件中', '已签收'),
      allowNull: false
    }
  })
  Packages.belongsTo(Locations, {
    foreignKey: 'sender_city',
    targetKey: 'location',
    onUpdate: 'CASCADE'
  })
  Packages.belongsTo(Locations, {
    foreignKey: 'receiver_city',
    targetKey: 'location',
    onUpdate: 'CASCADE'
  })
  return Packages
}
