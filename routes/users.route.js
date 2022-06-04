const { Router } = require('express')
const router = Router()
const Users = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

router.get('/data', async (req, res) => {
    try {
        let page = parseInt(req.query.page || '0')
        const limit = 10
        const total = await Users.countDocuments({})
        if (page >= Math.ceil(total / limit)) { page = Math.ceil(total / limit) - 1 }
        const users = await Users.find({}).limit(limit).skip(10 * page)
        res.json({ pages: Math.ceil(total / limit), users })
    } catch (error) {
        console.log(error);
    }
})

router.delete('/deleteUsers', async (req, res) => {
    try {
        const user = await Users.deleteMany({ _id: req.query.users })
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret);
        if (user) {
            if (req.query.users.includes(decoded.userId)) {
                res.json({ message: "User must log out" })
            } else {
                res.json({ success: true })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/blockUsers', async (req, res) => {
    try {
        const user = await Users.updateMany({ _id: req.body.users }, { status: 0 })
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret);
        if (user) {
            if (req.body.users.includes(decoded.userId)) {
                res.json({ message: "User must log out" })
            } else {
                res.json({ success: true })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/unblockUsers', async (req, res) => {
    try {
        const user = await Users.updateMany({ _id: req.body.users }, { status: 1 })
        if (user) {
            res.json({ success: true })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router