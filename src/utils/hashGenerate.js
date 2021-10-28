const crypto = require('crypto')

module.exports = (value) => {
    return crypto.createHmac('sha256', process.env.PASSWORD_SECRET).update(value).digest('hex');
}