const Sequelize = require('sequelize')

const sequelize = new Sequelize('db_learn', 'jxtxzzw_dev', 'jxtxzzw_dev', {
  host: 'www.jxtxzzw.com',
  dialect: 'mariadb',
  // dialectOptions: {connectTimeout: 1000} // mariadb connector option
})

const Groups = sequelize.import('./models/Groups')

const Users = sequelize.import('./models/Users')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    console.log(sequelize.isDefined('User'))
    Users.drop()
    Groups.drop()
    Groups.sync({force: true})
    Users.sync({force: true})
    console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })



