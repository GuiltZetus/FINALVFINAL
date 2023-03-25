const express = require('express')
const router = express.Router()
const Author = require('../models/author')
// All Authors route
router.get('/', (req,res)=> {
    res.render('authors/index')
})

// New authors route
router.get('/new', (req,res) => {
    res.render('authors/new', { author : new Author() })
})

// Create Author Route
router.post('/', async (req,res) => {
    const author = new Author({
        name : req.body.name
    }) 
    try {
        const newAuthor = await author.save()
        res.redirect('authors')
    }
    catch {
        res.render('authors/new', {
        author : author,
        errorMessage : 'error creating author'
        })
    } 
})


  
module.exports = router


