const User = require('./src/entity/User').User;
const ORMUtil = require('./ORMUtil');

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

async function getDBInstance() {
  try {
    let db = await ORMUtil.createDBConnection();
    return Promise.resolve(db);
  } catch (e) {
    return Promise.reject(e);
  }
}

async function getUserByEmail(email) {
  try {
    let db = await getDBInstance()
    let user = await db.manager.findOne(User, { email: email });
    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject(e);
  }
}

async function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    let user;
    try {
      user = await getUserByEmail(email)
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
    } catch (e) {
      return done(null, false, { message: 'Error to get DB info' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initialize