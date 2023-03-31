if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const {checkAuthenticated, checkNotAuthenticated} = require('./authenticates.js')


const initializePassport = require('./passport-config')

initializePassport(passport, 
                    email => User.findOne({email : email}).sort({_id: 1}),
                    id => User.findOne({id : id}).sort({_id: 1})
)


const User = require('/Work Archive/LapTrinhWeb/FINALVFINAL/models/user')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const userRouter = require('./routes/users')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(flash())
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

const mongoose = require('mongoose')
const user = require('/Work Archive/LapTrinhWeb/FINALVFINAL/models/user')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use('/users', userRouter)

// login


app.get('/', checkAuthenticated, (req, res) => {
  res.render('login')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), (req,res) => {
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const users =  new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role : 'basic'
    })
    const newUser = await users.save()
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
app.listen(process.env.PORT || 3000)