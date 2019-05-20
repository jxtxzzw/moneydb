const Sequelize = require('sequelize')

const sequelize = new Sequelize('db_learn', 'jxtxzzw_dev', 'jxtxzzw_dev', {
  host: 'www.jxtxzzw.com',
  dialect: 'mariadb',
  dialectOptions: {connectTimeout: 1000} // mariadb connector option
})

const User = sequelize.import('./model/User')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    console.log(sequelize.isDefined('User'))
    User.sync({force: true})
    console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })



