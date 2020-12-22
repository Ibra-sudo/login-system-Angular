const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.signup = async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) return

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetailes = {
            name: name,
            email: email, 
            password: hashedPassword
        }

        const result = await User.save(userDetailes)

        res.status(201).json({ message: 'User registerd!' })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}