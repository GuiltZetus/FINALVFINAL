const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Book = require('../models/book')
const bcrypt = require('bcrypt')
const { checkAuthenticated } = require('../authenticates')




router.get('/',checkAuthenticated, async (req, res) => {
    if(req.user.role == 'admin'){
        query= Book.find()
    }
    else{
        query = Book.find({userPublisher:req.user.id})
    }
    try {
      const books = await query.exec()
      res.render('users/index', {
        username : req.user.username,
        books: books,
        searchOptions: req.query
      })
    } catch(err) {
        console.log(err)
      res.redirect('/')
    }
  })

module.exports = router

