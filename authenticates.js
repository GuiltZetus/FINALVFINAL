const express = require('express')
const user = require('./models/user')
const router = express.Router()
const Book = require('./models/book')

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    else{
      console.log(user)
      res.redirect('/login')
    }
  }
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


  function checkAuthenticateRole(req,res,next){
    if(req.user.role !== 'admin'){
        res.status(401)
        return res.send('not authorized to view this page')
    }
    next()
  }

  async function checkAuthenticateEdit(req,res,next){
    const publisher = await Book.findOne({_id:req.params.id})
    console.log(publisher.userPublisher)
    if (publisher.userPublisher !== req.user.id && req.user.role !== 'admin'){
      res.status(401)
      return res.send('not authorized to view this page')
    }
    else{
      next()
    }
    
  }

  

  module.exports = {checkAuthenticated, checkNotAuthenticated, checkAuthenticateRole, checkAuthenticateEdit}