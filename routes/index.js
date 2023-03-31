const express = require('express')
const { checkAuthenticateRole } = require('../authenticates')
const router = express.Router()
const Book = require('../models/book')
const User = require('../models/user')


router.get('/', checkAuthenticated, async (req, res) => {
  console.log(req.params.id)
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
    
  } catch {
    books = []
  }
  res.render('index', { books: books})
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  else{
    res.redirect('/login')
  }
}

module.exports = router