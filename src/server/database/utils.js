const utils = {
  orm: function () {
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('db_learn', 'jxtxzzw_dev', 'jxtxzzw_dev', {
      host: 'www.jxtxzzw.com',
      dialect: 'mariadb',
      // dialectOptions: {connectTimeout: 1000} // mariadb connector option
    })
    return sequelize
  },
  jsonWrite: function(response, result) {
    if(typeof result === 'undefined') {
      response.json({
        code: '1',
        msg: '操作失败'
      });
    } else {
      response.json(result)
    }
  }
}

module.exports = utils
