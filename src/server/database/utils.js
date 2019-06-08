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
  },
  flushUserPermission: async function (uuid, permission, given) {
    const orm = utils.orm()
    const Permissions = orm.import('./models/Permissions')
    const Sequelize = require('sequelize')
    const MemberPermissions = orm.import('./models/MemberPermissions')
    if (permission === "仓储权限") {
      Permissions.findAll({
        where: Sequelize.or({
          api: "/WareHouse/Count"
        }, {
          api: "/WareHouse/Max"
        }, {
          api: "/WareHouse/Add"
        }, {
          api: "/WareHouse/Query"
        }, {
          api: "/WareHouse/ManagerList"
        }, {
          api: "/WareHouse/Delete"
        }, {
          api: '/Location/Query'
        }),
        attributes: ['permission_id']
      })
        .then(async project => {
          for (const x of project) {
            const option = {
              where: {
                uuid: uuid,
                permission_id: x.permission_id
              }
            }
            if (given) {
              await MemberPermissions.findOrCreate(option)
            } else {
              await MemberPermissions.destroy(option)
            }
          }
        })
    }
    if (permission === "前台接待权限") {
      Permissions.findAll({
        where: Sequelize.or({
          api: "/Package/Count"
        }, {
          api: "/Package/Max"
        }, {
          api: "/Package/Add"
        }, {
          api: "/Package/Query"
        }, {
          api: "/Location/Query"
        }, {
          api: "/Package/Delete"
        }, {
          api: "/Package/Tracking"
        }, {
          api: "/Dispatcher/Info"
        }),
        attributes: ['permission_id']
      })
        .then(async project => {
          for (const x of project) {
            const option = {
              where: {
                uuid: uuid,
                permission_id: x.permission_id
              }
            }
            if (given) {
              await MemberPermissions.findOrCreate(option)
            } else {
              await MemberPermissions.destroy(option)
            }
          }
        })
    }
    if (permission === "运输权限") {
      Permissions.findAll({
        where: Sequelize.or({
          api: "Package/Checkpoint"
        }, {
          api: "/WareHouse/Query"
        }),
        attributes: ['permission_id']
      })
        .then(async project => {
          for (const x of project) {
            const option = {
              where: {
                uuid: uuid,
                permission_id: x.permission_id
              }
            }
            if (given) {
              await MemberPermissions.findOrCreate(option)
            } else {
              await MemberPermissions.destroy(option)
            }
          }
        })
    }
    if (permission === "人力资源权限") {
      Permissions.findAll({
        where: Sequelize.or({
          api: "/Employee/Count"
        }, {
          api: "/Employee/Max"
        }, {
          api: "/Employee/Add"
        }, {
          api: "/Employee/Query"
        }, {
          api: "/Employee/Privilege"
        }, {
          api: "/User/Email"
        }, {
          api: "/Employee/EmailUnique"
        }, {
          api: "/User/ResetPassword"
        }),
        attributes: ['permission_id']
      })
        .then(async project => {
          for (const x of project) {
            const option = {
              where: {
                uuid: uuid,
                permission_id: x.permission_id
              }
            }
            if (given) {
              await MemberPermissions.findOrCreate(option)
            } else {
              await MemberPermissions.destroy(option)
            }
          }
        })
    }
    if (permission === "派件权限") {
      Permissions.findAll({
        where: Sequelize.or({
          api: "/DispatcherPair/Count"
        }, {
          api: "/DispatcherPair/Done"
        }, {
          api: "/DispatcherPair/Query"
        }),
        attributes: ['permission_id']
      })
        .then(async project => {
          for (const x of project) {
            const option = {
              where: {
                uuid: uuid,
                permission_id: x.permission_id
              }
            }
            if (given) {
              await MemberPermissions.findOrCreate(option)
            } else {
              await MemberPermissions.destroy(option)
            }
          }
        })
    }
  }
}

module.exports = utils
