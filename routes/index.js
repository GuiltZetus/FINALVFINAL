const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', checkAuthenticated, async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('here')
    return next()
  }
  else{
    res.redirect('/login')
  }
}

module.exports = router