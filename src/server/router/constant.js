const crypto = require('crypto')

module.exports = {
  MD5_SUFFIX: 'jxtxzzw_passwordSuffix_HU74REIY98FBWIUEB',
  md5: (pwd) => {
    let md5 = crypto.createHash('md5')
    return md5.update(pwd).digest('hex')
  },
  secretKey: 'jxtxzzw_secretKey_019UEDJ3AKS6DIRG)'
}
