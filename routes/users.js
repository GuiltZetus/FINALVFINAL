const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



router.get('/', async (req,res) => {
    user = await User.findOne(req.body.email)
    res.render('users/index', {username : user.username , password : user.password , email : user.email} )
})

module.exports = router

