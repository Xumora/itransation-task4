const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { secret } = require('../config/config')
const authToken = require('../middeware/authMiddleware')

router.post('/registration', [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Password can not be empty').isLength({ min: 1 })
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res(400).json({ errors: errors.array(), message: 'Error during registration' })
            }
            const { username, email, password, status } = req.body

            const isUsed = await User.findOne({ email })
            if (isUsed) {
                return res.json({ success: false, message: "This email already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                username, email, password: hashedPassword, registrationDate: moment.utc().format(), status, latestLogin: moment.utc().format()
            })

            await user.save()

            const token = jwt.sign(
                { userId: user._id }, secret, { expiresIn: '1h' }
            )

            res.json({ success: true, token })

        } catch (error) {
            console.log(error)
        }
    })

router.post('/login', [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Wrong password').exists()
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res(400).json({
                    errors: errors.array(),
                    message: 'Wrong data'
                })
            }
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                return res.json({ success: false, message: 'There is not such an email' })
            }
            if (user.status === 0) {
                return res.json({ success: false, message: 'This user is blocked' })
            }

            let isMatch = await bcrypt.compare(password, user.password).then(validPass => {
                if (validPass) {
                    return true
                } else {
                    return false
                }
            }).catch(err => console.log(err))
            if (!isMatch) {
                return res.json({ success: false, message: 'Passwords do not match' })
            }

            const token = jwt.sign(
                { userId: user._id }, secret, { expiresIn: '1h' }
            )

            await User.findOneAndUpdate({ email }, { latestLogin: moment.utc().format() })

            res.json({ success: true, token })

        } catch (error) {
            console.log(error)
        }
    })

router.get('/tokenValidation', authToken, async (req, res) => {
    res.json({ success: true })
})

module.exports = router