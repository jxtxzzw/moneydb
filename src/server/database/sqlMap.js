// sql语句
const sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, name, age) values (0, ?, ?)',
    login: 'select * from user where username=? and password=?'
  },
}

module.exports = sqlMap
