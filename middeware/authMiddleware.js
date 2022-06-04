const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json(err)
        }
        next()
    })
}