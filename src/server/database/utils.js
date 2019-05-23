const utils = {
  orm: function () {
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('db_learn', 'jxtxzzw_dev', 'jxtxzzw_dev', {
      host: 'www.jxtxzzw.com',
      dialect: 'mariadb',
      dialectOptions: {connectTimeout: 5000} // mariadb connector option
    })
    return sequelize
  }
}

module.exports = utils
