// sql语句
const sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, name, age) values (0, ?, ?)'
  }
}

module.exports = sqlMap
