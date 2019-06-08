const utils = {
  orm: function () {
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('db_learn', 'jxtxzzw_dev', 'jxtxzzw_dev', {
      host: 'www.jxtxzzw.com',
      dialect: 'mariadb',
      dialectOptions: {connectTimeout: 5000} // mariadb connector option
    })
    return sequelize
  },
  getCascadedLocation: async function (location) {
    const orm = utils.orm()
    const Locations = orm.import('./models/Locations')
    const cascadedLocation = []
    while (location != null) {
      console.log(location)
      cascadedLocation.push(location)
      await Locations.findOne({
        where: {
          location: location
        },
        attributes: ['father']
      })
        .then(project => {
          location = project.get().father
        })
    }
    return cascadedLocation.reverse()
  }
}

module.exports = utils
