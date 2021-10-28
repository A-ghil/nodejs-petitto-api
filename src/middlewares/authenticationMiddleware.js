const jsonwebtoken = require('jsonwebtoken')

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (token) {
        const decodedToken = jsonwebtoken.decode(token)
        const user = { id: decodedToken.data.id }
        req.user = user
    }
    next()
}


module.exports = authenticationMiddleware