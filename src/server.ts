if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express = require('express');
import UserStuff = require('../test');  //TODO: REMOVE
import ORMUtil = require('../ORMUtil');
import { User } from "./entity/User";

const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const PORT = 3000;

const initializePassport = require('../passport-config')
initializePassport(passport)

async function getDBInstance() {
  try {
    let db = await ORMUtil.createDBConnection();
    return Promise.resolve(db);
  } catch (e) {
    return Promise.reject(e);
  }
}

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  // @ts-ignore
  const {name} = req.user;
  res.render('index.ejs', { name: name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let user = new User();
    user.email = req.body.email;
    user.password = hashedPassword;

    let db = await getDBInstance()
    await db.manager.save(user);

    res.redirect('/login')
  } catch (error) {
    req.flash('error', JSON.stringify(error.detail));
    res.redirect('/register')
  }
})

app.get('/test', async (req, res) => {
    let userStuff = new UserStuff();
    try {
      let obj = await userStuff.createUser();
      res.send(obj)
    } catch (e) {
      res.send(e)
    }
})

app.delete('/logout', (req, res) => {
  // @ts-ignore
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(PORT, function(){
  console.log('Express server listening on port ' + PORT);
});